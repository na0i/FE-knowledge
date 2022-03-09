import React from 'react';
import styled from 'styled-components';
import PaperList from 'src/components/paper/paperList';
import rootStore from 'src/stores/rootStore';

const SearchResult = ({ paperList }) => {
	const { searchStore } = rootStore();
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
						<PaperList key={paper.id} paper={paper} addSelectedPaper={searchStore.addSelectedPaper} />
					))}
				</div>
			</SearchResultLayout>
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

const MoreButton = styled.button`
  background-color: #F8F8F8;
  border: #F8F8F8;
  width: 100%;
  height: 35px;
  cursor: pointer;
`