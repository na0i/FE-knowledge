import React from 'react';
import styled from 'styled-components';

import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';

const searchList = () => {
  return(
    <div>
      <PeriodFilter></PeriodFilter>
      <SearchResult></SearchResult>
      <InterestedPaper></InterestedPaper>
    </div>
  );
}

export default searchList;