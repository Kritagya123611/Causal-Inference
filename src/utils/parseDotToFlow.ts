import { read } from "graphlib-dot";

let idCounter = 0;

export function parseDotToFlow(dotString: string) {
  const graph = read(dotString);
  const nodes = graph.nodes().map((id) => ({
    id,
    data: { label: id },
    position: { x: Math.random() * 400, y: Math.random() * 300 },
  }));

  const edges = graph.edges().map((edge) => ({
    id: `e${idCounter++}`,
    source: edge.v,
    target: edge.w,
    animated: true,
  }));

  return { nodes, edges };
}
