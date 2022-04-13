import React, { useState, useEffect } from 'react';
import SearchHeader from 'src/components/header/searchHeader';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FilterButtonLayer } from '../subjectFilter/filterButtonLayer/filterButtonLayer';
import { HeatmapChartLayer } from '../subjectFilter/chart/heatmapChart';
import { getPaperTrend } from 'src/API/chart';
import { getPaperRecommend } from 'src/API/search';
import { getAdjacentSubjectLabels } from 'src/API/subject';
import { getConceptLabels } from 'src/API/concept';
import PaperList from 'src/components/paper/paperList';
import { SortRadioButton } from 'src/components/button/sortRadioButton';
import { MoreButton } from 'src/components/button/moreButton';

/* commit test주석 작성 */

const ConceptFilter = () => {
	const navigate = useNavigate();

	const [recommandPaper, setRecommandPaper] = useState([]);
	const [adjacentLabel, setAdjacentLabel] = useState([]);
	const [subLabel, setSubLabel] = useState([]);
	const [trendChartData, setTrendChartData] = useState({});

	/*---------------------- data fetching -----------------------*/

	const fetchRecommandData = async () => {
		setRecommandPaper(await getPaperRecommend());
	};

	const fetchAdjacentLabelData = async () => {
		setAdjacentLabel(await getAdjacentSubjectLabels());
	};

	const fetchSubLabelData = async () => {
		setSubLabel(await getConceptLabels());
	};

	const getPaperTrendData = async (id) => {
		setTrendChartData(await getPaperTrend(id));
	};

	/* ----------------------------------------------------------- */

	const gotoSubject = (id) => {
		navigate(`/subjectFilter?si=${id}`);
	};

	const gotoConcept = (id) => {
		navigate(`/conceptFilter?ci=${id}`);
	};

	useEffect(() => {
		fetchAdjacentLabelData();
		fetchSubLabelData();
		fetchRecommandData();
		getPaperTrendData();
	}, []);

	return (
		<div>
			<SearchHeader font={24} />
			<Frame>
				<ContentsUpperBox>
					<div className="flex">
						<ContentsFilter>
							<FilterLayerBox>
								<FilterButtonLayer
									onClick={gotoSubject}
									type="route"
									title={'인접 주제'}
									data={adjacentLabel}
								/>
							</FilterLayerBox>
							<FilterLayerBox>
								<FilterButtonLayer
									onClick={gotoConcept}
									type="label"
									title={'인접 개념어'}
									data={subLabel}
								/>
							</FilterLayerBox>
						</ContentsFilter>
						<ContentsChart>
							<HeatmapChartLayer data={trendChartData} />
						</ContentsChart>
					</div>
				</ContentsUpperBox>
				<ContentsLowerBox>
					<LowerBoxHeader>
						<Title>개념어 관련 논문 추천</Title>
						{/* <FilterSelect>
							<option>중요도 순</option>
						</FilterSelect> */}
						{/* <SortRadioButton sortFatchFunction={} /> */}
						<SortRadioButton />
					</LowerBoxHeader>
					<RecommendLayout>
						{recommandPaper?.map((paper) => (
							<PaperList paper={paper} key={paper.id} />
						))}
						<ButtonWrapper>
							<MoreButton />
						</ButtonWrapper>
					</RecommendLayout>
				</ContentsLowerBox>
			</Frame>
		</div>
	);
};
export default ConceptFilter;

const Frame = styled.div`
	min-height: calc(100vh - 140px);
	margin: 0 auto;
	width: 990px;
	padding: 30px;
`;
const ContentsUpperBox = styled.div`
	min-height: 70%;
`;
const ContentsLowerBox = styled.div`
	min-height: 30%;
`;
const LowerBoxHeader = styled.div`
	padding: 20px 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
// const FilterSelect = styled.select`
// 	border-radius: 5px;
// 	border: 1px solid #9fb8c6;
// 	height: 40px;
// 	:focus {
// 		outline: none;
// 	}
// `;

const FilterLayerBox = styled.div`
	margin-bottom: 20px;
`;

const ContentsFilter = styled.div`
	padding: 30px 20px;
	display: flex;
	width: 50%;
	flex-direction: column;
`;

const Title = styled.p`
	font-size: var(--font-size-20);
	margin: 10px 0;
`;

const ContentsChart = styled.div`
	display: flex;
	width: 80%;
	flex-direction: column;
`;

const RecommendLayout = styled.ul`
	width: 100%;
	padding: 0.5rem 1rem;
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
