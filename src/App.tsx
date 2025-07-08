// src/App.tsx
import UploadAndRun from "./components/UploadAndRun";

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">🌐 CausalLens</h1>
      <UploadAndRun />
    </div>
  );
}
