import React from "react";
import styled from "styled-components";

const sidebarMenus = [
  {id: 0, name: 'SST'},
  {id: 1, name: 'TTS'},
  {id: 2, name: 'SST2'},
  {id: 3, name: 'TTS2'},
]

const Sidebar = () => {
  return(
    <Side>
    {sidebarMenus.map((menu)=><MenuButton key={menu.id}>{menu.name}</MenuButton>)}
    </Side>
  );
}

export default Sidebar;

const Side = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap : wrap;
  align-content: flex-start;
  width: 300px;
  height: 100vh;
  border-right: 1px solid gray;
`

const MenuButton = styled.button`
  width: 80px;
  height: 80px;
  margin: 10px;
`