import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

interface Props {
  nodes: any[];
  edges: any[];
}

export default function CausalGraph({ nodes, edges }: Props) {
  return (
    <div className="w-full h-[500px] border rounded mt-6">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
