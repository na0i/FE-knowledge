// import { request } from 'src/utils/axios';

const tempChartData = {
	datasets: [
		{
			type: 'line',
			label: '인공지능',
			borderColor: 'rgb(54, 162, 235)',
			borderWidth: 2,
			data: [
				{ x: '2019-4', y: 8 },
				{ x: '2020-1', y: 6 },
				{ x: '2020-2', y: 9 },
				{ x: '2020-3', y: 12 },
				{ x: '2020-4', y: 18 },
			],
			yAxisID: 'y',
		},
		{
			type: 'line',
			label: '공학 4.0',
			backgroundColor: 'rgb(255, 99, 132)',
			data: [
				{ x: '2019-4', y: 14 },
				{ x: '2020-1', y: 20 },
				{ x: '2020-2', y: 32 },
				{ x: '2020-3', y: 41 },
				{ x: '2020-4', y: 15 },
			],
			borderColor: 'red',
			borderWidth: 2,
			yAxisID: 'y',
		},
		{
			type: 'line',
			label: '운영효율성',
			borderColor: 'rgb(75, 192, 192)',
			borderWidth: 2,
			data: [
				{ x: '2019-4', y: 16 },
				{ x: '2020-1', y: 17 },
				{ x: '2020-2', y: 19 },
				{ x: '2020-3', y: 16 },
				{ x: '2020-4', y: 18 },
			],
			yAxisID: 'y',
		},
	],
};

const trendChartDataTemp = [
	{
		name: '인공지능',
		data: [
			{ x: '자연과학', y: 12 },
			{ x: '사회의학', y: 29 },
			{ x: '의약학', y: 57 },
			{ x: '교육학', y: 43 },
			{ x: '인공지능', y: 87 },
			{ x: ['공학', '4.0'], y: 22 },
			{ x: ['운영', '효율성'], y: 34 },
			{ x: '생명공학', y: 44 },
		],
	},
	{
		name: '공학 4.0',
		data: [
			{ x: '자연과학', y: 21 },
			{ x: '사회의학', y: 44 },
			{ x: '의약학', y: 52 },
			{ x: '교육학', y: 15 },
			{ x: '인공지능', y: 77 },
			{ x: ['공학', '4.0'], y: 99 },
			{ x: ['운영', '효율성'], y: 98 },
			{ x: '생명공학', y: 34 },
		],
	},
	{
		name: '운영 효율성',
		data: [
			{ x: '자연과학', y: 52 },
			{ x: '사회의학', y: 76 },
			{ x: '의약학', y: 43 },
			{ x: '교육학', y: 64 },
			{ x: '인공지능', y: 9 },
			{ x: ['공학', '4.0'], y: 56 },
			{ x: ['운영', '효율성'], y: 13 },
			{ x: '생명공학', y: 90 },
		],
	},
];

/*-------------------------------------------------------------- */

export const getChartData = async () => {
	// const res = await request("GET", "url", {data:'data'});

	return tempChartData;
};

export const getPaperTrend = async () => {
	// const res = await request("GET", "url", {data:'data'});

	return trendChartDataTemp;
};
