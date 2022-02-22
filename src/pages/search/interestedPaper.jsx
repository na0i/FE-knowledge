import React from 'react';
import styled from 'styled-components';

const interestedPaper = (selectedPapers, removeSelectedPaper) => {
  // 왜 selectedPapers이렇게 생겼지..?
  return(
    <div>
      <div className='mt-16 mb-16'>관심있는 논문</div>
      <hr/>
      <div>
        {selectedPapers.selectedPapers?.map((paper)=>
        (
          <div key={paper.id}>
            <LeftBox>
              <div key={paper.id}>{paper.title}</div>
            </LeftBox>
            <RightBox>
              <RemoveButton onClick={removeSelectedPaper(paper)}>-</RemoveButton>
            </RightBox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default interestedPaper;

const LeftBox = styled.div`
  width: 95%;
  float: left;
  margin: 10px 0px 10px 0px;
`

const RightBox = styled.div`
  width: 5%;
  float: left;
  justify-content: center;
`

const RemoveButton = styled.button`
  display: block;
  background-color: white;
  border-radius: 100%;
  font-size: 20px;
  width: 30px;
  height: 30px;
`