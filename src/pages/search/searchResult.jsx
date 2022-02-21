import React from 'react';
import styled from 'styled-components';

const SearchResult = ({onChange, papers}) => {
  return(
    <div>
      <input onChange={onChange}></input>
      <div>
        {papers.searchResult?.map((paper) => (
          <div key={paper.id}>
            <div>
              <div>{paper.title}</div>
              <div>{paper.author}</div>
              <div>{paper.year}</div>
              <div>{paper.conceptWords}</div>
              <div>{paper.topicWords}</div>
            </div>
            <button>+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;