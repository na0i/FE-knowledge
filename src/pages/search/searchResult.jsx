import React from 'react';
import MoreButton from 'src/components/moreButton';
import styled from 'styled-components';

const SearchResult = ({papers, addSelectedPaper}) => {
  return(
    <div>
      <div className='mt-16 mb-16'>검색결과 {papers.searchLength}건</div>
      <hr/>

      <div>
        {papers?.map((paper) => (
          <div key={paper.id}>
            <LeftBox>
              <Title>{paper.title}</Title>
              <div>저자: {paper.author}</div>
              <div>개념어: {paper.conceptWords}</div>
              <div>주제어: {paper.topicWords}</div>
            </LeftBox>
            <RightBox>
              <AddButton onClick={()=>addSelectedPaper(paper)}>+</AddButton>
            </RightBox>
          </div>
        ))}
      </div>
      
      <MoreButton/>
    </div>
  );
}

export default SearchResult;

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

const AddButton = styled.button`
  display: block;
  background-color: white;
  border-radius: 100%;
  font-size: 20px;
  width: 30px;
  height: 30px;
`

const Title = styled.p`
  font-size: 17px;
  margin-bottom: 3px;
`