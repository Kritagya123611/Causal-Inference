// src/utils/loadPyodideInstance.ts
let pyodideInstance: any = null;

export async function getPyodideInstance() {
  if (pyodideInstance) return pyodideInstance;

  pyodideInstance = await (window as any).loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.2/full/",
  });

  await pyodideInstance.loadPackage(["pandas", "numpy", "micropip"]);
  return pyodideInstance;
}
