import React from 'react';
import styled from 'styled-components';
import { GraphChart } from 'src/components/chart/graph';

export const GraphChartLayer = ({ data }) => {
	return (
		<ChartPaper>
			<ChartHeader>
				<ChartTitleBox>
					<ChartTitle>전기공학, 통신 분야</ChartTitle>
					<ChartSubTitle>트렌드 연구 주제 수요지표</ChartSubTitle>
				</ChartTitleBox>
				<ChartFilterBox>
					<ChartFilterSubBox>
						<ChartFilterTitle>기 간:</ChartFilterTitle>
						<ChartFilter>
							<option>과거 5분기</option>
						</ChartFilter>
					</ChartFilterSubBox>
					<ChartFilterSubBox>
						<ChartFilterTitle>수요지표:</ChartFilterTitle>
						<ChartFilter>
							<option>누적 인용수</option>
						</ChartFilter>
					</ChartFilterSubBox>
				</ChartFilterBox>
			</ChartHeader>
			<ChartBox>
				<GraphChart data={data} />
			</ChartBox>
		</ChartPaper>
	);
};

const ChartPaper = styled.div`
	width: 90%;
	box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
	margin: 10px;
`;

const ChartHeader = styled.div`
	padding: 10px 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ChartTitleBox = styled.div`
	width: 70%;
`;

const ChartTitle = styled.p`
	font-size: 1.2rem;
	margin: 10px;
	font-weight: bold;
`;

const ChartSubTitle = styled.p`
	margin: 10px;
`;

const ChartFilterBox = styled.div`
	width: 40%;
`;

const ChartFilterSubBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
`;

const ChartFilterTitle = styled.div`
	width: 30%;
`;

const ChartFilter = styled.select`
	width: 70%;
	border-radius: 5px;
	border: 1px solid #9fb8c6;
	height: 20px;
	:focus {
		outline: none;
	}
`;

const ChartBox = styled.div`
	height: 80%;
`;
