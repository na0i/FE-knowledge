import React from 'react';
import styled from 'styled-components';

import HeaderImg from 'src/assets/header.jpg';
import { SearchBoxComp } from 'src/components/search';
import { UseLocationQuery } from 'src/utils/useLocation';

const SearchHeader = () => {
	const search = UseLocationQuery();

	return (
		<SearchHeaderLayout>
			<SearchBoxComp font={16} height={50} text={search.q} />
		</SearchHeaderLayout>
	);
};

export default SearchHeader;

const SearchHeaderLayout = styled.div`
	background-image: url(${HeaderImg});
	height: 140px;
	display: flex;
	padding: 30px 15vw;
`;
