import React from 'react';
import MoreButton from 'src/components/moreButton';
import styled from 'styled-components';
import PaperList from 'src/components/paper/paperList';
import { SearchNoResult } from './searchNoResult';

const SearchResult = ({ paperList }) => {
	return (
		<>
			<SearchResultLayout>

				<div>
					{paperList.length? 
          <>
          {paperList.map((paper) => (
						<PaperList key={paper.id} paper={paper}/>))}
            <MoreButton />
            </>
             : <SearchNoResult/>}
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

