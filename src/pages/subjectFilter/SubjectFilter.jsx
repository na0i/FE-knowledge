import React, { useState, useEffect } from 'react';
import SearchHedaer from 'src/components/header/searchHeader';
import styled from 'styled-components';
import { FilterButtonLayer } from './filterButtonLayer/filterButtonLayer';
import { GraphChartLayer } from './chart/graphChart';
import { HeatmapChartLayer } from './chart/heatmapChart';
import { useNavigate } from 'react-router-dom';
import PaperList from 'src/components/paper/paperList';

import { getChartData, getPaperTrend } from 'src/API/chart';
import { getPaperRecommend } from 'src/API/search';
import { getAdjacentSubjectLabels, getSubLabels, getSubjectData } from 'src/API/subject';
import { getConceptLabels } from 'src/API/concept';

import { SubjectSelector } from './subjectSelector';
import { SortRadioButton } from 'src/components/button/sortRadioButton';
import { MoreButton } from 'src/components/button/moreButton';

const SubjectFilter = () => {
	const [chartData, setChartData] = useState([]);
	const [trendChartData, setTrendChartData] = useState({});
	const [recommandPaper, setRecommandPaper] = useState();
	const [adjacentLabel, setAdjacentLabel] = useState([]);
	const [conceptLabel, setConceptLabel] = useState([]);
	const [subLabel, setSubLabel] = useState([]);
	const [subjectData, setSubjectData] = useState([]);
	const navigate = useNavigate();

	const fetchChartData = async () => {
		setChartData(await getChartData());
	};

	const fetchAdjacentLabelData = async (id) => {
		setAdjacentLabel(await getAdjacentSubjectLabels(id));
	};

	const fetchSubLabelData = async () => {
		setSubLabel(await getSubLabels());
	};

	const fetchConceptLabelData = async () => {
		setConceptLabel(await getConceptLabels());
	};

	const fetchSubjectData = async () => {
		setSubjectData(await getSubjectData());
	};

	const fetchRecommandData = async () => {
		setRecommandPaper(await getPaperRecommend());
	};

	const getPaperTrendData = async (id) => {
		setTrendChartData(await getPaperTrend(id));
	};

	const gotoSubject = (id) => {
		navigate(`/subjectFilter?si=${id}`);
	};

	const gotoConcept = (id) => {
		navigate(`/conceptFilter?ci=${id}`);
	};

	useEffect(() => {
		fetchChartData();
		fetchAdjacentLabelData();
		fetchRecommandData();
		fetchSubLabelData();
		fetchConceptLabelData();
		getPaperTrendData();
		fetchSubjectData();
	}, []);

	return (
		<div>
			<SearchHedaer font={24} />
			<Frame>
				<ContentsUpperBox>
					<ContentsFilter>
						<FilterLayerBox>
							<FilterButtonLayer
								onClick={gotoSubject}
								type="label"
								title={'인접 주제'}
								data={adjacentLabel}
							/>
						</FilterLayerBox>
						<FilterLayerBox>
							<FilterButtonLayer onClick={gotoSubject} type="label" title={'하위 주제'} data={subLabel} />
						</FilterLayerBox>
						<FilterLayerBox>
							<FilterButtonLayer
								onClick={gotoConcept}
								type="route"
								title={'인접 개념어'}
								data={conceptLabel}
							/>
						</FilterLayerBox>
					</ContentsFilter>
					<ContentsChart>
						<GraphChartLayer width={85} data={chartData} />
						<HeatmapChartLayer width={85} data={trendChartData} />
					</ContentsChart>
				</ContentsUpperBox>
				<ContentsLowerBox>
					<LowerBoxHeader>
						<Title>주제 관련 논문 추천</Title>
						{/* <FilterSelect>
							<option>중요도 순</option>
						</FilterSelect> */}
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
export default SubjectFilter;

const Frame = styled.div`
	margin: 0 auto;
	min-height: calc(100vh - 140px);
	width: 990px;
	padding: 30px;
`;

const ContentsUpperBox = styled.div`
	padding: 20px 10px;
	min-height: 70%;
	display: flex;
	justify-content: space-between;
`;

const ContentsFilter = styled.div`
	padding: 30px 20px;
	display: flex;
	width: 50%;
	flex-direction: column;
`;

const FilterLayerBox = styled.div`
	margin-bottom: 20px;
`;

const Title = styled.p`
	font-size: var(--font-size-20);
	margin: 10px 0;
`;

const ContentsChart = styled.div`
	display: flex;
	align-items: center;
	width: 80%;
	flex-direction: column;
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
