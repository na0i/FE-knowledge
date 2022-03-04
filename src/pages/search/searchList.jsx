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
	const [selectedPapers, setSelectedPaper] = useState([]);

	// query → paper fetch
	const getPaperList = async () => {
		const res = await getPaperSearchList();
		return res;
	};

	// set paperList
	const setPaperList = async (year) => {
		const paperList = await getPaperList();
		const filteredPaperList = yearFiltering(paperList, year);
		setSearchedPaperList(filteredPaperList);
	};

	// get interested paperList from localStorage
	const getInterestedPaperList = () => {
		const newArr = JSON.parse(localStorage.getItem('interestedPapers'));
		setSelectedPaper(newArr);
	};

	// filter paperList by year
	const yearFiltering = (arr, standardYear) => {
		return arr.filter((element) => parseInt(element.year) >= standardYear);
	};

	// current year
	const onSelectedYear = (year) => {
		setSelectedYear(year.name);
	};

	// isHere ? true : false
	const isHere = (list, id) => {
		if (list.findIndex((element) => element.id === id) === -1) {
			return false;
		}
		return true;
	};

	// add to interested paperlist
	const addSelectedPaper = (paper) => {
		if (!isHere(selectedPapers, paper.id)) {
			let newArr = [];
			newArr = [...selectedPapers, paper];
			setSelectedPaper(newArr);
			localStorage.setItem('interestedPapers', JSON.stringify(newArr));
		}
	};

	// remove interested paper
	const removeSelectedPaper = (paper) => {
		if (isHere(selectedPapers, paper.id)) {
			let newArr = [];
			newArr = selectedPapers.filter((element) => element.id !== paper.id);
			setSelectedPaper(newArr);
			localStorage.setItem('interestedPapers', JSON.stringify(newArr));
		}
	};

	useEffect(() => setPaperList(selectedYear), [selectedYear]);
	useEffect(() => getInterestedPaperList(), []);

	return (
		<Wrapper>
			<SearchHeader font={24} />

			<LeftBox>
				<PeriodFilter years={yearArr} onSelectedYear={onSelectedYear} />
			</LeftBox>

			<RighBox>
				<SearchResult paperList={searchedPaperList} addSelectedPaper={addSelectedPaper} />
				<InterestedPaper selectedPapers={selectedPapers} removeSelectedPaper={removeSelectedPaper} />
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
