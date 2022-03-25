import React, { useState } from "react";
import styled from "styled-components";

const SELECTBOX_DATA = [
  {
    id: "1",
    value: "음성텍스트로 받아쓰기",
    desc: "음성을 입력하면 자동으로 텍스트로 변환해줘요:)",
  },
  {
    id: "2",
    value: "영상 자막 생성하기",
    desc: "영상 음성을 분석해 ai가 자동으로 자막을 생성해줘요:)",
  },
  {
    id: "3",
    value: "음성으로 검색하기",
    desc: "음성으로 검색하는 기능이 필요한 경우 사용해 보세요:)",
  },
];

function SelectBox() {
  const [isSTTSelectBoxActive, setIsSTTSelectBoxActive] = useState(false);
  const [isTTSSelectBoxActive, setIsTTSSelectBoxActive] = useState(false);
  const onSTTTrigger = () => {
    setIsSTTSelectBoxActive(!isSTTSelectBoxActive);
    setIsTTSSelectBoxActive(isSTTSelectBoxActive);
  };
  const onTTSTrigger = () => {
    setIsTTSSelectBoxActive(!isTTSSelectBoxActive);
    setIsSTTSelectBoxActive(isTTSSelectBoxActive);
  };

  return (
    <>
      <div>
        <TriggerButton onClick={onSTTTrigger}>STT</TriggerButton>
        <TriggerButton onClick={onTTSTrigger}>TTS</TriggerButton>
        {isSTTSelectBoxActive ? (
          <SelectBoxContainer>
            {SELECTBOX_DATA.map((el) => (
              <SelectBoxButton key={el.id}>
                <span>
                  {el.value}
                  <ToolTip>{el.desc}</ToolTip>
                </span>
                {/* <ToolTip>{el.desc}</ToolTip> */}
              </SelectBoxButton>
            ))}
          </SelectBoxContainer>
        ) : (
          <></>
        )}
        {isTTSSelectBoxActive ? (
          <SelectBoxContainer>
            {SELECTBOX_DATA.map((el) => (
              <SelectBoxButton key={el.id}>TTS</SelectBoxButton>
            ))}
          </SelectBoxContainer>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default SelectBox;

const TriggerButton = styled.button`
  border: 1px solid black;
  width: 50px;
  height: 50px;
`;

const SelectBoxContainer = styled.div`
  border: 1px solid black;
  width: 180px;
`;

const ToolTip = styled.span`
  display: none;
  position: absolute;
  padding: 10px;
  background-color: gray;
  color: white;
  font-size: 12px;
  max-width: 180px;
`;

const SelectBoxButton = styled.button`
  border: 1px solid white;
  border: none;
  background-color: white;
  width: 180px;
  padding: 5px;
  font-size: 15px;
  &:hover {
    background-color: gainsboro;
  }
  &:hover ${ToolTip} {
    display: block;
    top: 7.5%;
    left: 200px;
  }
`;
