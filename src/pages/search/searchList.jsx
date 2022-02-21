import React, { useEffect, useState } from 'react';
import { request } from 'src/utils/axios';
import _ from 'lodash';
import styled from 'styled-components';

import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';
import SearchHeader from 'src/components/header/searchHeader';

/************************************* jsx *************************************/

const SearchList = () => {
	console.log('들어왓어요');
	const [searchedPaperList, setSearchedPaperList] = useState([]);

  const handleInput = _.debounce((e) => {
      getsearchedPaperList(e.target.value);
    }, 100);

  const getsearchedPaperList = async () => {
    // async과 await을 붙이지 않으면 pending 발생
    const res = await request('GET', 'https://mocki.io/v1/c4eeb733-989b-4db6-8aaa-e1d06986443e');
    console.log(res);
    setSearchedPaperList(res);
  }

	useEffect(() => {
		getsearchedPaperList();
	}, [])

	return (
		<div>
			<SearchHeader font={24}></SearchHeader>
			<PeriodFilter></PeriodFilter>
			<SearchResult onChange={handleInput} papers={searchedPaperList}></SearchResult>
			<InterestedPaper></InterestedPaper>
		</div>
	);
};

export default SearchList;
