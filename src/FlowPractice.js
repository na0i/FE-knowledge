import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import initialElements from "./initial-elements";

function FlowPractice() {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onLoad = (reactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    reactFlowInstance.fitView();
  };

  return (
    <div style={{ height: 1000 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        snapToGrid={true}
      />
    </div>
  );
}

export default FlowPractice;
