# 🌐 CausalLens

**CausalLens** is a browser-native, real-time causal inference platform that lets you upload data and uncover causal relationships — all directly in the browser using Pyodide and causal-learn.

> 🔍 Go beyond correlation. Understand **what causes what** — interactively.

---

## 🚀 Features

- 📈 Upload CSV files and automatically generate causal graphs (DAGs)
- ⚡ Pure client-side: runs Python (via Pyodide) directly in the browser
- 🔎 Uses [causal-learn](https://github.com/py-why/causal-learn) to discover causal structure (PC algorithm)
- 🧠 Outputs Graphviz DOT and visualizes it with `d3-graphviz`
- 🧪 Ready for real-time causal reasoning and counterfactuals (planned)

---

## 📸 Demo

![screenshot placeholder](https://your-screenshot-or-demo.gif)

---

## 🧩 Tech Stack

| Component       | Tech                             |
|----------------|----------------------------------|
| Frontend       | React + Vite + Tailwind CSS      |
| Graph Viewer   | d3-graphviz + pydot DOT rendering |
| Causal Engine  | Pyodide + causal-learn (PC algo) |
| Python Runtime | Pyodide (Python in WebAssembly)  |

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Kritagya123611/Causal-Inference.git
cd Causal-Inference

