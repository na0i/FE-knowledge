import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UseLocationQuery } from 'src/utils/useLocation';
import PeriodFilter from './periodFilter';
import SearchResult from './searchResult';
import InterestedPaper from './interestedPaper';
import SearchHeader from 'src/components/header/searchHeader';
import { getPaperSearchList } from 'src/API/search';
import { SortRadioButton } from 'src/components/button/sortRadioButton';
import Pagination from './pagination';
import { useNavigate } from 'react-router-dom';

//year filter static format
const yearArr = [
	{ id: 0, value: null, name: '전체기간' },
	{ id: 1, value: 2022, name: '2022년부터' },
	{ id: 2, value: 2021, name: '2021년부터' },
	{ id: 3, value: 2020, name: '2020년부터' },
	{ id: 4, value: 2019, name: '2019년부터' },
	{ id: 5, value: null, name: '사용자 지정' },
];

const SearchList = () => {
	const search = UseLocationQuery();

	const navigate = useNavigate();
	const [sortOptions, setSortOptions] = useState([
		{ id: 1, selected: true, name: '정확도' },
		{ id: 2, selected: false, name: '최신순' },
	]);
	const [searchedPaperList, setSearchedPaperList] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const [currentPage, setCurrentPage] = useState(search.p ? search.p - 1 : 0);
	const [postsPerPage, setPostsPerPage] = useState(10);
	const [selectedYear, setSelectedYear] = useState(yearArr[0]);

	// set paperList
	const setPaperList = async (query, year, sort, page) => {
		const paperList = await getPaperSearchList(query, year, sort, page + 1);
		setTotalPosts(paperList.totalPost);
		setSearchedPaperList(paperList.paperList);
	};

	// current year
	const onSelectedYear = (idx) => {
		setSelectedYear(yearArr[idx]);
	};

	useEffect(() => {
		if (!search.p) navigate({ pathname: '/search', search: `?q=${search.q}&p=1` });
	}, []);

	useEffect(() => {
		const selectSortOption = sortOptions.filter((sort) => sort.selected === true);
		setPaperList(search.q, selectedYear.value, selectSortOption[0].name, currentPage);
	}, [selectedYear, sortOptions, currentPage]);

	useEffect(() => {
		if (currentPage !== search.p) navigate({ pathname: '/search', search: `?q=${search.q}&p=${currentPage + 1}` });
	}, [currentPage]);

	return (
		<Wrapper>
			<SearchHeader font={24} />
			<Body>
				<PeriodFilter
					years={yearArr}
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
					onSelectedYear={onSelectedYear}
				/>
				<SubHeader>
					<PaperLength>
						<span className="mr-5">검색결과</span>
						<PointColor>{searchedPaperList.length}</PointColor>
					</PaperLength>
					<div>
						<SortRadioButton sortOptions={sortOptions} setSortOptions={setSortOptions} />
					</div>
				</SubHeader>
				<SearchResult paperList={searchedPaperList} />
				<Pagination
					currentPage={currentPage}
					postsPerPage={postsPerPage}
					setPostsPerPage={setPostsPerPage}
					totalPosts={totalPosts}
					paginate={setCurrentPage}
				/>
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

const SubHeader = styled.div`
	margin: 0 auto 36px auto;
	display: flex;
	width: 990px;
	justify-content: space-between;
`;

const PaperLength = styled.span`
	font-size: var(--font-size-16);
	font-weight: 700;
`;

const PointColor = styled.span`
	color: var(--color-orange-point);
`;
