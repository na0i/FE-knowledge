import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
/************************************* jsx *************************************/
//trendChart
export const TrendChart = ({ chartData }) => {
	// tooltip text
	const tooltipText = (label) => {
		if (Array.isArray(label)) {
			return label.join(' ');
		} else return label;
	};

	const [series, setSeries] = useState(chartData);
	const [options, setOptions] = useState({
		chart: {
			height: 400,
			type: 'heatmap',
			toolbar: {
				show: true,
				tools: {
					download: true,
					selection: false,
					zoom: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
				},
				width: '100%',
			},
		},
		yaxis: {
			label: {
				text: '%',
			},
		},
		plotOptions: {
			heatmap: {
				radius: 2,
				enableShades: true,
				shadeIntensity: 0.8,
				reverseNegativeShade: true,
				distributed: false,
				useFillColorAsStroke: false,
				colorScale: {
					inverse: true,
					min: undefined,
					max: undefined,
				},
			},
		},

		label: {
			borderColor: '#c2c2c2',
			borderWidth: 1,
			borderRadius: 2,
			text: undefined,
			textAnchor: 'middle',
			offsetX: 0,
			offsetY: -15,
			mouseEnter: undefined,
			mouseLeave: undefined,
			style: {
				background: '#fff',
				color: '#777',
				fontSize: '12px',
				fontWeight: 400,
				fontFamily: undefined,
				cssClass: 'apexcharts-point-annotation-label',
				padding: {
					left: 5,
					right: 5,
					top: 0,
					bottom: 2,
				},
			},
		},
		xaxis: {
			position: 'top',
			type: 'category',
			categories: [],
			tickAmount: undefined,
			min: undefined,
			max: undefined,
			range: undefined,
			floating: false,
			labels: {
				hideOverlappingLabels: false,
			},
			tickPlacement: 'between',
		},
		dataLabels: {
			enabled: false,
		},
		tooltip: {
			enabled: true,
			enabledOnSeries: undefined,
			shared: true,
			followCursor: true,
			intersect: false,
			inverseOrder: false,
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				return `
				<div class="tooltip">과거 1년 간 <strong>${tooltipText(w.globals.seriesNames[seriesIndex])}</strong> 관련 주제가
							<strong>${tooltipText(w.globals.labels[dataPointIndex])}</strong> 연구의 
							<strong>${series[seriesIndex][dataPointIndex]}%</strong> 에 등장했습니다.
					</div>`;
			},
			fixed: {
				enabled: true,
				position: 'bottomRight',
			},
		},
		colors: ['#2F75A3'],
		title: {
			text: '트렌드 연구 주제 관련 활성도',
			align: 'left',
			margin: 20,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: '18px',
				fontWeight: 'bold',

				fontFamily: undefined,
				color: '#263238',
			},
		},
	});

	return (
		<div>
			<ReactApexChart options={options} series={series} type="heatmap" height={300} />
		</div>
	);
};
