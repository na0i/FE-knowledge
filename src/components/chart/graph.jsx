import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const options = {
	interaction: {
		mode: 'index',
	},
	plugins: {
		legend: {
			position: 'bottom',
			align: 'end',
			labels: {
				usePointStyle: true,
				pointStyle: 'line',
				padding: 15,
				font: {
					family: "'Noto Sans KR', 'serif'",
					lineHeight: 1,
				},
			},
		},
		tooltip: {
			backgroundColor: 'rgba(255, 255, 255, 0.95)',
			titleColor: '#212121',
			bodyColor: '#616161',
			borderWidth: 2,
			borderColor: '#dadce0',
			caretSize: 5,
			padding: 20,
			bodySpacing: 10,
			bodyFont: {
				font: {
					family: "'Noto Sans KR', sans-serif",
				},
			},
			usePointStyle: true,
			filter: (item) => item.parsed.y !== null,
			callbacks: {
				labelPointStyle: function (context) {
					return {
						pointStyle: 'circle',
					};
				},
				title: (context) => context[0].label,
				label: (context) => {
					let label = context.dataset.label + '' || '';
					return context.parsed.y !== null ? label + '  ' + context.parsed.y + '건' : null;
				},
			},
		},
	},
	scales: {
		x: {
			afterTickToLabelConversion: function (scaleInstance) {
				const ticks = scaleInstance.ticks;

				const newTicks = ticks.map((tick) => {
					return {
						...tick,
						label: tick.label,
					};
				});
				scaleInstance.ticks = newTicks;
			},
			grid: {
				display: false,
				drawTicks: true,
				tickLength: 4,
				color: '#E2E2E230',
			},
			axis: 'x',
			position: 'bottom',
			ticks: {
				padding: 5,
			},
		},
		y: {
			title: {
				display: true,
				position: 'bottom',
				fullSize: false,
				align: 'start',
				color: '#616161',
				font: {
					size: 12,
					family: "'Noto Sans KR', sans-serif",
					weight: 300,
				},
				text: '단위: 건',
			},
			type: 'linear',
			grid: {
				color: '#E2E2E230',
			},
			afterDataLimits: (scale) => {
				scale.max = scale.max * 1.2;
			},
			axis: 'y',
			display: true,
			position: 'left',
		},
	},
};

export const GraphChart = ({ data }) => {
	return <Container>{data.datasets ? <Line type="line" data={data} options={options} /> : <></>}</Container>;
};

const Container = styled.div`
	width: 95%;
`;
