import React from "react";
import styled from "styled-components";

const ToolbarModal = () => {
  return <Modal>툴바모달</Modal>;
};

export default ToolbarModal;

const Modal = styled.div`
  position: fixed;
  width: 40vw;
  height: 40vh;
  top: 30vh;
  left: 30vw;
  right: 30vw;
  background-color: wheat;
  z-index: 999;
`;
