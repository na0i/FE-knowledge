import React, { useState } from "react";
import styled from 'styled-components';

const SELECTBOX_DATA = [
  { id: '1', value: '음성텍스트로 받아쓰기', desc: '음성을 입력하면 자동으로 텍스트로 변환해줘요:)' },
  { id: '2', value: '영상 자막 생성하기', desc: '영상 음성을 분석해 ai가 자동으로 자막을 생성해줘요:)' },
  { id: '3', value: '음성으로 검색하기', desc: '음성으로 검색하는 기능이 필요한 경우 사용해 보세요:)' },
];

function SelectBox () {
  const [isSelectBoxActive, setIsSelectBoxActive] = useState(false);
  const onTrigger = () => {
    setIsSelectBoxActive(!isSelectBoxActive);
  }

  return(
    <>
      <div>
       <TriggerButton onClick={onTrigger}>STT</TriggerButton>
      </div>
      {isSelectBoxActive? (
      <SelectBoxContainer>
        {SELECTBOX_DATA.map((el) =>
          <SelectBoxButton
            key={el.id}
            title={el.desc}
          >{el.value}</SelectBoxButton>
        )}
      </SelectBoxContainer>
      ) : <></> }
    </>
  )
}

export default SelectBox;

const TriggerButton = styled.button`
  border: 1px solid black;
  width: 50px;
  padding: 5px; 
`

const SelectBoxContainer = styled.div`
  border: 1px solid black;
  width: 180px;
`

const SelectBoxButton = styled.button`
  border: 1px solid white;
  border: none;
  background-color: white;
  width: 180px;
  padding: 5px; 
  &:hover {
    /* border: 1px solid gray; */
    background-color: gainsboro;
  }
`