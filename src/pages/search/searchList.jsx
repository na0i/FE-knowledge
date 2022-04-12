import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';
import SearchHeader from 'src/components/header/searchHeader';
import { getPaperSearchList } from 'src/API/search';

const SearchList = () => {
	const yearArr = [
		{ id: 0, name: '전체 보기' },
		{ id: 1, name: '2022년 부터' },
		{ id: 2, name: '2021년 부터' },
		{ id: 3, name: '2020년 부터' },
		{ id: 4, name: '2019년 부터' },
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
<<<<<<< HEAD
		setSearchedPaperList(filteredPaperList);
=======
 		setSearchedPaperList(filteredPaperList);
>>>>>>> f11c6f49fd5e1c45fc95960e30799c3077f43958
	};

	// current year
	const onSelectedYear = (year) => {
		setSelectedYear(year.name);
	};

	useEffect(() => setPaperList(selectedYear), [selectedYear]);

	return (
		<Wrapper>
			<SearchHeader font={24} />
<<<<<<< HEAD
			<Body>
				<PeriodFilter years={yearArr} selectedYear={selectedYear} onSelectedYear={onSelectedYear} />
				<SearchResult paperList={searchedPaperList} />
				<InterestedPaper />
			</Body>
=======

			<LeftBox>
				<PeriodFilter years={yearArr} onSelectedYear={onSelectedYear} />
			</LeftBox>

			<RighBox>
				<SearchResult paperList={searchedPaperList} />
				<InterestedPaper />
			</RighBox>
>>>>>>> f11c6f49fd5e1c45fc95960e30799c3077f43958
		</Wrapper>
	);
};

export default SearchList;

// styled component
const Wrapper = styled.div`
	width: 100%;
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: auto;
	width: 990px;
`;
