import React from 'react';
import MoreButton from 'src/components/moreButton';
import styled from 'styled-components';

const SearchResult = ({papers, addSelectedPaper}) => {
  return(
    <div>
      <Top>
        <span>검색결과 {papers.length}건</span>
        <FilterButton>관련도 순</FilterButton>
      </Top>
      <hr/>

      <div>
        {papers?.map((paper) => (
          <div key={paper.id}>
            <BoxContainer>
              <LeftBox>
                <Title>{paper.title}</Title>
                <div>저자: {paper.author}</div>
                <div>개념어: {paper.conceptWords}</div>
                <div>주제어: {paper.topicWords}</div>
              </LeftBox>
              <RightBox>
                <AddButton onClick={()=>addSelectedPaper(paper)}>+</AddButton>
              </RightBox>
            </BoxContainer>
          </div>
        ))}
      </div>
      
      <MoreButton/>
    </div>
  );
}

export default SearchResult;

// styled component
const Top = styled.div`
  display: flex;
  margin: 16px 0px 16px 0px;
  justify-content: space-between;
`

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
`

const LeftBox = styled.div`
  width: 95%;
  margin: 10px 0 10px 0;
`

const RightBox = styled.div`
  width: 5%;
`

const FilterButton = styled.button`
  background-color: white;
  border: 1px solid;
  border-radius: 7%;
`

const AddButton = styled.button`
  background-color: white;
  border-radius: 100%;
  font-size: 20px;
  width: 30px;
`

const Title = styled.p`
  font-size: 17px;
  margin-bottom: 5px;
`