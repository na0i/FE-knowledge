import React from "react";
import styled from 'styled-components';

const PaperItem = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
`

const PaperTitle = styled.span`
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const RecentPaperListItem = (paper) => {
  return(
  <PaperItem
  >
    <PaperTitle>{paper.title}</PaperTitle>
    <span>{paper.author} {paper.releaseYear}</span>
  </PaperItem>);
};

export default RecentPaperListItem;