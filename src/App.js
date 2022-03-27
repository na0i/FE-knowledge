import { useState } from "react";
import SelectBox from "./SelectBox";
import Sidebar from "./Sidebar";
import ToolbarModal from "./ToolbarModal";

function App() {
  const [openToolbar, setOpenToolbar] = useState(false);

  return (
    <div className="App">
      <Sidebar></Sidebar>
      <SelectBox></SelectBox>
      <>
        {openToolbar ? (
          <ToolbarModal openToolbar={setOpenToolbar}></ToolbarModal>
        ) : (
          <></>
        )}{" "}
      </>
    </div>
  );
}

export default App;
