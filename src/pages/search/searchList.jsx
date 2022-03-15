import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';
import SearchHeader from 'src/components/header/searchHeader';
import { getPaperSearchList } from 'src/API/search';

const SearchList = () => {
	const yearArr = [
		{ id: 0, name: '0' },
		{ id: 1, name: '2022' },
		{ id: 2, name: '2021' },
		{ id: 3, name: '2020' },
		{ id: 4, name: '2019' },
		{ id: 5, name: '사용자지정' },
	];
	const [searchedPaperList, setSearchedPaperList] = useState([]);
	const [selectedYear, setSelectedYear] = useState(0);

	// query → paper fetch
	const getPaperList = async () => {
		const res = await getPaperSearchList();
		return res;
	};

	// set paperList
	const setPaperList = async (year) => {
		const paperList = await getPaperList();
		const filteredPaperList = paperList.filter((element) => parseInt(element.year) >= year);
 		setSearchedPaperList(filteredPaperList);
	};

	// current year
	const onSelectedYear = (year) => {
		setSelectedYear(year.name);
	};

	useEffect(() => setPaperList(selectedYear), [selectedYear]);

	return (
		<Wrapper>
			<SearchHeader font={24} />

			<LeftBox>
				<PeriodFilter years={yearArr} onSelectedYear={onSelectedYear} />
			</LeftBox>

			<RighBox>
				<SearchResult paperList={searchedPaperList} />
				<InterestedPaper />
			</RighBox>
		</Wrapper>
	);
};

export default SearchList;

// styled component
const Wrapper = styled.div`
	width: 100%;
`;
const LeftBox = styled.div`
	float: left;
	width: 15%;
`;

const RighBox = styled.div`
	float: left;
	width: 70%;
`;
