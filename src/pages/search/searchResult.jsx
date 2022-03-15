import React from 'react';
import MoreButton from 'src/components/moreButton';
import styled from 'styled-components';
import PaperList from 'src/components/paper/paperList';

const SearchResult = ({ paperList }) => {
	return (
		<>
			<SearchResultLayout>
				<SubHeader>
					<SubHeaderTitle className="f-18">
						검색결과 <span className="black bold">{paperList.length}</span> 건
					</SubHeaderTitle>
					<RadioBottom></RadioBottom>
				</SubHeader>
				<div>
					{paperList?.map((paper) => (
						<PaperList key={paper.id} paper={paper}/>
					))}
				</div>
			</SearchResultLayout>
			<MoreButton />
		</>
	);
};

export default SearchResult;

// styled component
const SearchResultLayout = styled.div`
	display: flex;
	flex-direction: column;
`;

const SubHeader = styled.div`
	padding: 1.5rem 0 1rem 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid rgba(0, 0, 0, 0.18);
`;

const SubHeaderTitle = styled.div`
	color: #656565;
`;

const RadioBottom = styled.div``;
