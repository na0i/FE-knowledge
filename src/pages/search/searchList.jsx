import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';
import SearchHeader from 'src/components/header/searchHeader';
import { getPaperSearchList } from 'src/API/search';
import { SearchNoResult } from './searchNoResult';

const SearchList = () => {
	const yearArr = [
		{ id: 0, value: 0, name: '전체기간' },
		{ id: 1, value: 2022, name: '2022년부터' },
		{ id: 2, value: 2021, name: '2021년부터' },
		{ id: 3, value: 2020, name: '2020년부터' },
		{ id: 4, value: 2019, name: '2019년부터' },
		{ id: 5, value: 9999, name: '사용자 지정' },
	];
	const [searchedPaperList, setSearchedPaperList] = useState([]);
	const [selectedYearValue, setSelectedYearValue] = useState(0);
	const [selectedYearName, setSelectedYearName] = useState('전체기간');

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
    setSelectedYearValue(year.value);
    setSelectedYearName(year.name);
	};

	useEffect(() => setPaperList(selectedYearValue), [selectedYearValue]);
	return (
		<Wrapper>
			<SearchHeader font={24} />
			<Body>
				<PeriodFilter years={yearArr} selectedYearName={selectedYearName} selectedYearValue={selectedYearValue} onSelectedYear={onSelectedYear} />
			<SubHeader>
					<PaperLength>
            <span>검색결과 </span>
            <PointColor>{searchedPaperList.length}</PointColor>
          </PaperLength>
          <SortOptions>
          </SortOptions>
				</SubHeader>
				<SearchResult paperList={searchedPaperList} />
				<InterestedPaper />
			</Body>
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


///////////////////
const SubHeader = styled.div`
  padding: 36px 0px 24px 0px;
	display: flex;
	width: 990px;
	margin: 0 auto;
	justify-content: space-between;
	border-bottom: 1px solid #F0F0F0;
`;

const PaperLength = styled.span`
font-size: var(--font-size-16);
font-weight: 700;
`;

const PointColor = styled.span`
  color: var(--color-orange-point);
`;

const SortOptions = styled.div``
const Option = styled.span``