import React from "react";
import styled from "styled-components";

const sidebarMenus = [
  {
    id: 0,
    name: "SST",
    items: [
      {
        id: 0,
        value: "음성 텍스트로 받아쓰기",
        desc: "음성을 입력하면 자동으로 텍스트로 변환해줘요:)",
      },
      {
        id: 1,
        value: "영상 자막 생성하기",
        desc: "영상 음성을 분석해 ai가 자동으로 자막을 생성해줘요:)",
      },
      {
        id: 2,
        value: "음성으로 검색하기",
        desc: "음성으로 검색하는 기능이 필요한 경우 사용해 보세요:)",
      },
    ],
  },
  {
    id: 1,
    name: "TTS",
    items: [
      { id: 0, value: "음성 텍스트로 받아쓰기" },
      { id: 1, value: "영상 자막 생성하기" },
      { id: 2, value: "음성으로 검색하기" },
    ],
  },
  {
    id: 2,
    name: "SST2",
    items: [
      {
        id: 0,
        value: "음성 텍스트로 받아쓰기",
        desc: "음성을 입력하면 자동으로 텍스트로 변환해줘요:)",
      },
      {
        id: 1,
        value: "영상 자막 생성하기",
        desc: "영상 음성을 분석해 ai가 자동으로 자막을 생성해줘요:)",
      },
      {
        id: 2,
        value: "음성으로 검색하기",
        desc: "음성으로 검색하는 기능이 필요한 경우 사용해 보세요:)",
      },
    ],
  },
  {
    id: 3,
    name: "TTS2",
    items: [
      { id: 0, value: "음성 텍스트로 받아쓰기" },
      { id: 1, value: "영상 자막 생성하기" },
      { id: 2, value: "음성으로 검색하기" },
    ],
  },
];

const Sidebar = ({ handleToolbar }) => {
  return (
    <Side>
      {sidebarMenus.map((menu) => {
        return (
          <MenuDiv key={menu.id}>
            <MenuButton>{menu.name}</MenuButton>
            <MenuDropdowns>
              {menu.items?.map((item) => (
                <MenuDropdown key={item.id} onClick={handleToolbar}>
                  <>{item.value}</>
                  {item.desc ? (
                    <Tooltip>
                      <>{item.desc}</>
                      <TooltipCloseBtn>x</TooltipCloseBtn>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </MenuDropdown>
              ))}
            </MenuDropdowns>
          </MenuDiv>
        );
      })}
    </Side>
  );
};

export default Sidebar;

const Side = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
  width: 15vw;
  height: 100vh;
  border-left: 1px solid gray;
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  height: 50px;
  width: 200px;
  right: 110%;
  border: 1px solid #2c2c2c;
  background-color: #2c2c2c;
  color: white;
  font-size: 0.9rem;
  padding: 5px;
  justify-content: space-between;
  &::after {
    border-top: 5px solid transparent;
    border-left: 0px solid transparent;
    border-right: 10px solid #2c2c2c;
    border-bottom: 5px solid transparent;
    content: "";
    position: absolute;
    top: 5px;
    left: -10px;
  }
`;

const TooltipCloseBtn = styled.button`
  text-align: center;
  height: 1.2rem;
  border: transparent;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

const MenuDropdown = styled.div`
  background-color: white;
  padding: 10px;
  &:hover {
    background-color: #d8d8d8;
    cursor: default;
  }
  &:hover ${Tooltip} {
    display: flex;
  }
`;

const MenuDropdowns = styled.div`
  display: none;
  background-color: white;
  position: absolute;
  border: 1px solid black;
  margin-left: 10px;
  &::after {
    border-top: 0px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #484848;
    content: "";
    position: absolute;
    top: -10px;
    left: 10px;
  }
`;

const MenuDiv = styled.div`
  margin-top: 15px;
  &:hover ${MenuDropdowns} {
    display: block;
  }
`;

const MenuButton = styled.button`
  width: 100%;
  width: 80px;
  height: 80px;
  margin: 10px;
`;
