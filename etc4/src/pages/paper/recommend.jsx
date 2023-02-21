import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UseLocationQuery } from 'src/utils/useLocation';
import { getPaperRecommend } from 'src/API/search';
import Dropdown from 'src/components/button/dropdown';
import PaperList from 'src/components/paper/paperList';
import { SortRadioButton } from 'src/components/button/sortRadioButton';
import { MoreButton } from 'src/components/button/moreButton';

/************************************* jsx *************************************/

const Recommend = () => {
	const [loading, setLoading] = useState(true);
	const search = UseLocationQuery();
	const [recommendData, setRecommendData] = useState([]);
	const [sortOptions, setSortOptions] = useState([
		{ id: 1, selected: true, name: '정확도' },
		{ id: 2, selected: false, name: '최신순' },
	]);

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
							<h1 className="f-24 justify-between end title-font">
								관련 논문 추천
								<SortRadioButton sortOptions={sortOptions} setSortOptions={setSortOptions} />
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
	margin-top: 80px;
	width: 100%;
	h1 {
		font-size: var(--font-size-20);
		font-weight: 700;
		margin: 20px 0;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
