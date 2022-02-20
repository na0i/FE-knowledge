import React from 'react';
import styled from 'styled-components';

import { searchHeader, periodFilter, searchResult, interestedPaper } from './';

const searchList = () => {
  return(
    <div>
      <searchHeader/>
      <periodFilter/>
      <searchResult/>
      <interestedPaper/>
    </div>
  );
}

export default searchList;