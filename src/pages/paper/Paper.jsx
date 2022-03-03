import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SearchHeader from 'src/components/header/searchHeader';
import PaperInfo from './paperInfo';
import Trend from './trend';
import Recommend from './recommend';
import { UseLocationQuery } from 'src/utils/useLocation';
import { getPaperInfo } from 'src/API/search';

/************************************* jsx *************************************/

const Paper = () => {
	const [loading, setLoading] = useState(true);
	const [info, setInfo] = useState({});
	const search = UseLocationQuery();

	useEffect(() => {
		if (search.id) {
			setInfo(getPaperInfo(search.id));
			setLoading(false);
		}
	}, [search]);
	return (
		<>
			{!loading && (
				<>
					<SearchHeader font={24} />

					<SearchDetail className="column">
						<PaperHeader className="title-font">
							<MainTtitle className="bold mb-8">{info.title.ko}</MainTtitle>
							<SubTitle>{info.title.en}</SubTitle>
						</PaperHeader>
						<div className="flex">
							<PaperInfo info={info} />
							<Trend />
						</div>
						<Recommend />
					</SearchDetail>
				</>
			)}
		</>
	);
};

export default Paper;

/******************************** styled-components ********************************/

const SearchDetail = styled.div`
	width: 70vw;
	padding: 1rem;
	margin: 0.5rem auto;
`;

const PaperHeader = styled.div`
	line-height: 35px;
	padding: 1rem 1rem 2rem 1rem;
	border-bottom: 1px solid #efefef;
`;

const MainTtitle = styled.p`
	font-size: 1.5rem;
`;

const SubTitle = styled.p`
	font-size: 0.85rem;
	color: #959595;
`;
