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
	max-width: 35vw;
	width: 35vw;
	padding-left: 2vw;
	padding: 1.5rem 1rem 1rem 1rem;
`;
const TrendHeatMapDiv = styled.div`
	height: fit-content;
	padding: 1rem 1rem 0 1rem;
	box-shadow: -1px -1px 7px #dddddd, 1px 1px 7px #dddddd;
	border-radius: 5px;
`;
