import React, { useState, useEffect } from 'react';
import SearchHeader from 'src/components/header/searchHeader';
import styled from 'styled-components';
import { FilterButtonLayer } from '../subjectFilter/filterButtonLayer/filterButtonLayer';
import { HeatmapChartLayer } from '../subjectFilter/chart/heatmapChart';
import { getPaperTrend } from 'src/API/chart';
import { getPaperRecommend } from 'src/API/search';
import { getAdjacentSubjectLabels } from 'src/API/subject';
import { getConceptLabels } from 'src/API/concept';
import PaperList from 'src/components/paper/paperList';

const ConceptFilter = () => {
	const [conceptValue, setConceptValue] = useState('');
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

	const handleInput = (e) => {
		if (e.charCode === 13) {
			setConceptValue(e.target.value);
		}
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
					<ConceptSearchBox>
						<FilterLayerBox>
							<Title>개념어 필터</Title>
							<Input placeholder="개념어 검색하기" onKeyPress={handleInput} />
						</FilterLayerBox>
						<SubTitle>{conceptValue ? conceptValue + ' 검색결과' : ''} </SubTitle>
					</ConceptSearchBox>
					<div className="flex">
						<ContentsFilter>
							<FilterLayerBox>
								<FilterButtonLayer type="route" title={'인접 주제'} data={adjacentLabel} />
							</FilterLayerBox>
							<FilterLayerBox>
								<FilterButtonLayer type="label" title={'인접 개념어'} data={subLabel} />
							</FilterLayerBox>
						</ContentsFilter>
						<ContentsChart>
							<HeatmapChartLayer data={trendChartData} />
						</ContentsChart>
					</div>
				</ContentsUpperBox>
				<Divider />
				<ContentsLowerBox>
					<LowerBoxHeader>
						<Title>개념어 관련 논문 추천</Title>
						<FilterSelect>
							<option>중요도 순</option>
						</FilterSelect>
					</LowerBoxHeader>
					<RecommendLayout>
						{recommandPaper?.map((paper) => (
							<PaperList paper={paper} key={paper.id} />
						))}
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
	width: 80vw;
	border: 1px solid #d5e1e6;
	padding: 30px;
`;
const ContentsUpperBox = styled.div`
	padding: 20px 10px;
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
const FilterSelect = styled.select`
	border-radius: 5px;
	border: 1px solid #9fb8c6;
	height: 40px;
	:focus {
		outline: none;
	}
`;

const ConceptSearchBox = styled.div`
	width: 100%;
`;

const Divider = styled.hr`
	border-width: 1px 0px 0px 0px;
	border-style: solid;
	height: 1px;
	width: 98%;
	border-color: #e9f2f9;
	margin: 0 auto;
`;

const FilterLayerBox = styled.div`
	margin-bottom: 20px;
`;

const ContentsFilter = styled.div`
	padding: 30px 20px;
	display: flex;
	width: 40%;
	flex-direction: column;
`;

const Title = styled.p`
	font-size: 1.3rem;
	margin: 10px 0;
`;

const SubTitle = styled.p`
	font-size: 1.1rem;
	margin: 10px 0;
`;

const Input = styled.input`
	width: 100%;
	border-radius: 5px;
	border: 1px solid #9fb8c6;
	height: 40px;
	padding: 20px;
	:focus {
		outline: none;
	}
`;

const ContentsChart = styled.div`
	display: flex;
	width: 60%;
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
