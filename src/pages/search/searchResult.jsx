import React from 'react';
import MoreButton from 'src/components/moreButton';
import styled from 'styled-components';
import Dropdown from 'src/components/dropdown';
import PaperList from 'src/components/paper/paperList';

// dropdown option state
const recommandOption = [
	{ value: '중요도 순', default: true },
	{ value: '최신순', default: false },
];

const SearchResult = ({ paperList, addSelectedPaper }) => {
	return (
		<div>
			<Top>
				<span>검색결과 {paperList.length}건</span>
				<Dropdown options={recommandOption} font={14} />
			</Top>
			<hr />

			<div>
				{paperList?.map((paper) => (
					<PaperList key={paper.id} paper={paper} />
				))}
			</div>
			<MoreButton />
		</div>
	);
};

export default SearchResult;

// styled component
const Top = styled.div`
	display: flex;
	margin: 16px 0px 16px 0px;
	justify-content: space-between;
`;
