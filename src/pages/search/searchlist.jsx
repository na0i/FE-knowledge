import React, { useEffect, useState } from 'react';
import { UseLocationQuery } from 'src/utils/useLocation';
import { request } from 'src/utils/axios';
import styled from 'styled-components';

import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';
import SearchHeader from 'src/components/header/searchHeader';


const SearchList = () => {
	const searchQuery = UseLocationQuery().q;
	const yearArr = [{id: 0, name: '0'}, {id: 1, name: '2022'}, {id: 2, name: '2021'}, {id: 3, name: '2020'}, {id: 4, name: '2019'}, {id: 5, name: '사용자지정'}];
	const [searchedPaperList, setSearchedPaperList] = useState([]);
	const [selectedYear, setSelectedYear] = useState(0);
	const [selectedPapers, setSelectedPaper] = useState([]);
	
	// query → paper fetch
  const getPaperList = async () => {
		const res = await request('GET', 'https://mocki.io/v1/c4eeb733-989b-4db6-8aaa-e1d06986443e', searchQuery);
		return res.searchResult;
  };
	
	// set paperList
	const setPaperList = async (year) => {
		const paperList = await getPaperList();
		const filteredPaperList = yearFiltering(paperList, year);
		setSearchedPaperList(filteredPaperList);
	}
	
	// filter paperList by year
	const yearFiltering = (arr, standardYear) => {
		return (arr.filter((element) => parseInt(element.year) >= standardYear));
	};
	
	// current year
	const onSelectedYear = (year) => {
		setSelectedYear(year.name);
	}

	// isHere ? true : false
	const isHere = (list, id) => {
		if (list.findIndex((element) => element.id === id) === -1){
			return false;
		}
		return true;
	}

	// add to interested paperlist
	const addSelectedPaper = (paper) => {
		if (!isHere(selectedPapers, paper.id)){
			let newArr = [];
			newArr = [...selectedPapers, paper];
			setSelectedPaper(newArr);
		}
	}

	// remove interested paper 
	const removeSelectedPaper = (paper) => {
		if (isHere(selectedPapers, paper.id)){
			let newArr = [];
			newArr = selectedPapers.filter((element) => element.id !== paper.id);
			setSelectedPaper(newArr);
		}
	}

	useEffect(() => 
		setPaperList(selectedYear),
	[selectedYear]);

	return (
		<Wrapper>
			<SearchHeader font={24}/>

			<LeftBox>
				<PeriodFilter years={yearArr} onSelectedYear={onSelectedYear}/>
			</LeftBox>

			<RighBox>
				<SearchResult papers={searchedPaperList} addSelectedPaper={addSelectedPaper}/>
				<InterestedPaper selectedPapers={selectedPapers} removeSelectedPaper={removeSelectedPaper}/>
			</RighBox>

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
	width: 70%;
`