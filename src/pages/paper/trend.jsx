import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UseLocationQuery } from 'src/utils/useLocation';
import { getPaperTrend } from 'src/API/chart';
import { TrendChart } from 'src/components/chart/trendChart';

/************************************* jsx *************************************/

const Trend = () => {
	const [loading, setLoading] = useState(true);
	const search = UseLocationQuery();
	const [chartData, setChartData] = useState({});

	const getPaperTrendData = async (id) => {
		setChartData(await getPaperTrend(id));
		setLoading(false);
	};

	useEffect(() => {
		if (search.id) {
			getPaperTrendData(search.id);
		}
	}, [search]);

	return (
		<>
			{!loading && (
				<TrendLayout className="column">
					<TrendHeatMapDiv>
						<Title className="bold">트렌드 연구주제 활성도</Title>
						<TrendChart chartData={chartData} />
					</TrendHeatMapDiv>
				</TrendLayout>
			)}
		</>
	);
};

export default Trend;

/******************************** styled-components ********************************/

const TrendLayout = styled.ul`
	width: 100%;
`;
const TrendHeatMapDiv = styled.div`
	height: fit-content;
	padding: 22px 12px 4px 12px;
	box-shadow: 0px 0.5px 1.75px rgba(0, 0, 0, 0.039), 0px 1.85px 6.25px rgba(0, 0, 0, 0.19);
	border-radius: 4px;
`;

const Title = styled.div`
	margin: 12px;
	font-size: var(--font-size-16);
`;
