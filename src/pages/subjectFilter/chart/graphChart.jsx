import React from 'react';
import styled from 'styled-components';
import { GraphChart } from 'src/components/chart/graph';

export const GraphChartLayer = ({ data, width }) => {
	return (
		<ChartPaper width={width}>
			<ChartHeader>
				<ChartTitleBox>
					<ChartTitle>전기공학, 통신 분야</ChartTitle>
					<ChartTitle>트렌드 연구 주제 수요지표</ChartTitle>
				</ChartTitleBox>
				<ChartFilterBox>
					<ChartFilterSubBox>
						<ChartFilterTitle>기간 </ChartFilterTitle>
						<ChartFilter>
							<option>과거 5분기</option>
						</ChartFilter>
					</ChartFilterSubBox>
					<ChartFilterSubBox>
						<ChartFilterTitle>수요지표 </ChartFilterTitle>
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
	width: ${(props) => (props.width ? `${props.width}%` : '100%')};
	box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
	margin-bottom: 26px;
`;

const ChartHeader = styled.div`
	padding: 22px 20px 42px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ChartTitleBox = styled.div`
	width: 60%;
`;

const ChartTitle = styled.p`
	color: var(--color-black-text1);
	margin: 10px;
	font-weight: 700;
`;

const ChartFilterBox = styled.div`
	width: 50%;
`;

const ChartFilterSubBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px 0px;
`;

const ChartFilterTitle = styled.div`
	font-size: 0.75rem;
	width: 30%;
	text-align: right;
	margin-right: 10px;
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
