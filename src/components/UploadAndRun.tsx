// src/components/UploadAndRun.tsx
import { useState } from "react";
import { getPyodideInstance } from "../utils/loadPyodideInstance";
import GraphRenderer from "./GraphRenderer";

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
  }
}

export default function UploadAndRun() {
  const [csvData, setCsvData] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult("Running causal analysis...");

    try {
      const text = await file.text();
      setCsvData(text);

      const pyodide = await getPyodideInstance();

      // Step 1: Install causal-learn
      await pyodide.runPythonAsync(`
        import micropip
        await micropip.install("causal-learn")
      `);

      // Step 2: Load CSV
      await pyodide.runPythonAsync(`
        import pandas as pd
        from io import StringIO
        df = pd.read_csv(StringIO(${JSON.stringify(text)}))
      `);

      // Step 3: Run causal discovery + safe renaming
      await pyodide.runPythonAsync(`
from causallearn.search.ConstraintBased.PC import pc
from causallearn.utils.GraphUtils import GraphUtils
import pydot

data = df.to_numpy()
cg = pc(data, alpha=0.05)

pydot_graph = GraphUtils.to_pydot(cg.G)

# ✅ Safe node renaming using node IDs
column_names = df.columns.tolist()
for node in pydot_graph.get_nodes():
    node_id = node.get_name().strip('"')
    if node_id.isdigit():
        idx = int(node_id)
        if idx < len(column_names):
            node.set_name(column_names[idx])
            node.set_label(column_names[idx])

dot_string = pydot_graph.to_string()
      `);

      // Step 4: Get result back
      const dotResult = pyodide.globals.get("dot_string");
      setResult(dotResult);

    } catch (error) {
      console.error("Error during Pyodide causal inference:", error);
      setResult("❌ Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Upload CSV for Causal Graph Discovery</h2>
      <input type="file" accept=".csv" onChange={handleUpload} className="mb-4" />
      {loading && <p className="text-blue-500">Analyzing data...</p>}
      {result && <GraphRenderer dot={result} />}
    </div>
  );
}
