// src/components/GraphRenderer.tsx
import { useEffect, useRef } from "react";
import { graphviz } from "d3-graphviz";

interface GraphRendererProps {
  dot: string;
}

export default function GraphRenderer({ dot }: GraphRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && dot) {
      graphviz(ref.current).renderDot(dot);
    }
  }, [dot]);

  return <div ref={ref} />;
}
