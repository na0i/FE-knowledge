import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { SearchBoxComp } from 'src/components/search/search';
import { UseLocationQuery } from 'src/utils/useLocation';
import { ReactComponent as Logo } from 'src/assets/logo-header.svg';

const SearchHeader = () => {
	const search = UseLocationQuery();
	const navigator = useNavigate();

	const gotoMain = () => {
		navigator('/');
	};

	return (
		<SearchHeaderLayout>
			<HeaderFrame>
				<LogoFrame onClick={gotoMain}>
					<Logo />
				</LogoFrame>
				<SearchBoxComp font={16} width={540} selectWidth={110} height={50} text={search.q} />
			</HeaderFrame>
		</SearchHeaderLayout>
	);
};

export default SearchHeader;

const SearchHeaderLayout = styled.div`
	display: flex;
	align-items: center;
	height: 110px;
	box-shadow: 0 2px 4px rgb(0, 0, 0, 0.06);
`;

const HeaderFrame = styled.div`
	width: 990px;
	display: flex;
	margin: 0 auto;
	align-items: center;
	justify-content: left;
`;

const LogoFrame = styled.div`
	padding: 10px;
	cursor: pointer;
	margin: 0 20px;
`;
