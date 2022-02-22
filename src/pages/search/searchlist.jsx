import React, { useEffect, useState } from 'react';
import { UseLocationQuery } from 'src/utils/useLocation';
import { request } from 'src/utils/axios';
import styled from 'styled-components';

import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';
import SearchHeader from 'src/components/header/searchHeader';


const SearchList = () => {
	const search = UseLocationQuery();
	const yearArr = [{id: 0, name: '전체보기'}, {id: 1, name: '2022'}, {id: 2, name: '2021'}, {id: 3, name: '2020'}, {id: 4, name: '2019'}, {id: 5, name: '사용자지정'}];
	const [searchedPaperList, setSearchedPaperList] = useState([]);
	const [selectedYear, setSelectedYear] = useState(0);

	const filtering = (elements, standard) => {
		return (elements.filter((element) => {
			return (parseInt(element.id) === standard)
		}))
	};

  const getsearchedPaperList = async (year) => {
		const res = await request('GET', 'https://mocki.io/v1/c4eeb733-989b-4db6-8aaa-e1d06986443e', search.q);
		if (year) {
			const filteredPaperList = filtering(res.searchResult, year);
			setSearchedPaperList(filteredPaperList);
		} else {
			setSearchedPaperList(res);
		}
  };

	const onSelectedYear = (year) => {
		setSelectedYear(year);
	}

	useEffect(() => 
		getsearchedPaperList(selectedYear),
	[selectedYear]);

	return (
		<Wrapper>
			<SearchHeader font={24}/>

			<LeftBox>
				<PeriodFilter years={yearArr} onSelectedYear={onSelectedYear}/>
			</LeftBox>
			<RighBox>
				<SearchResult papers={searchedPaperList}/>
			</RighBox>
			
			<Bottom>
				<InterestedPaper/>
			</Bottom>
		</Wrapper>
	);
};

export default SearchList;

// styled component
const Wrapper = styled.div`
	width: 100%;
`
const LeftBox = styled.div`
	float: left;
	width: 15%;
`

const RighBox = styled.div`
	float: left;
	width: 65%;
`
const Bottom = styled.div`
	float: left;
	width: 100%;
	margin-left: 15%;
`