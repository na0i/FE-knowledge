import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UseLocationQuery } from 'src/utils/useLocation';
import { getPaperRecommend } from 'src/API/search';
import Dropdown from 'src/components/button/dropdown';
import PaperList from 'src/components/paper/paperList';
import { SortRadioButton } from 'src/components/button/sortRadioButton';
import { MoreButton } from 'src/components/button/moreButton';

// dropdown option state
const recommandOption = [
	{ value: '중요도 순', default: true },
	{ value: '최신순', default: false },
];

/************************************* jsx *************************************/

const Recommend = () => {
	const [loading, setLoading] = useState(true);
	const search = UseLocationQuery();
	const [recommendData, setRecommendData] = useState([]);

	const getRecommandData = async (id) => {
		setRecommendData(await getPaperRecommend(id));
		setLoading(false);
	};

	useEffect(() => {
		if (search.id) {
			getRecommandData();
		}
	}, [search]);

	return (
		<>
			{!loading && (
				<>
					<RecommendLayout className="column">
						<div className="justify-between">
							<h1 className="f-24 justify-between title-font">
								관련 논문 추천
								{/* <Dropdown options={recommandOption} font={14} /> */}
								{/* <SortRadioButton sortFatchFunction={} /> */}
								<SortRadioButton />
							</h1>
						</div>
						{recommendData?.map((paper) => {
							return <PaperList paper={paper} key={paper.id} />;
						})}
					</RecommendLayout>
					<ButtonWrapper>
						<MoreButton />
					</ButtonWrapper>
				</>
			)}
		</>
	);
};

export default Recommend;

/******************************** styled-components ********************************/

const RecommendLayout = styled.ul`
	margin: 5rem 0 10px 0;
	width: 100%;
	h1 {
		width: 100%;
		padding: 2rem 1rem 1rem 1rem;
		border-bottom: 1px solid #efefef;
	}
	li {
		font-size: 0.85rem;
		display: flex;
		list-style: none;
		margin: 0.5rem;
		line-height: 1.5;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
