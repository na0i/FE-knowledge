import { useState } from "react";
import styled from "styled-components";

import Contents from "./Contents";
import Sidebar from "./Sidebar";
import ToolbarModal from "./ToolbarModal";

function App() {
  const [toolbarOpen, setToolbarOpen] = useState(false);

  const handleToolbar = (e) => {
    setToolbarOpen(!toolbarOpen);
  };

  return (
    <Root className="App">
      <Contents></Contents>
      <Sidebar handleToolbar={handleToolbar}></Sidebar>
      <>
        {toolbarOpen && <ToolbarModal toolbarOpen={toolbarOpen}></ToolbarModal>}
      </>
    </Root>
  );
}

export default App;

const Root = styled.div`
  display: flex;
`;
