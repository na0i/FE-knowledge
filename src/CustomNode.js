import React from "react";
import { Handle } from "react-flow-renderer";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        border: "1px solid blue",
        textAlign: "center",
        background: "white",
        padding: 10,
      }}
    >
      <div>{data.label}</div>
      <Handle type="target" position="left"></Handle>
      <button>노드 추가</button>
      <Handle type="source" position="right"></Handle>
    </div>
  );
};

export default CustomNode;
