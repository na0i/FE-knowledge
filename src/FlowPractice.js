import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Handle,
} from "react-flow-renderer";
import CustomNode from "./CustomNode";
import initialElements from "./initial-elements";

function FlowPractice() {
  const [elements, setElements] = useState(initialElements);
  const nodeTypes = {
    customNode: CustomNode,
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onLoad = (reactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    reactFlowInstance.fitView();
  };

  const addNode = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: "생성" },
      type: "default",
      position: {
        x: 10,
        y: 10,
      },
    };
    setElements((prev) => {
      return [...prev, newNode];
    });
  };

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        snapToGrid={true}
        deleteKeyCode={46}
        nodeTypes={nodeTypes}
      ></ReactFlow>
    </div>
  );
}

export default FlowPractice;
