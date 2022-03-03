import { request } from 'src/utils/axios';

const tempSubjectLabels = [
	{ text: '항공우주관련주식', id: 124 },
	{ text: '농업관련주', id: 125 },
	{ text: '컴공관련주', id: 126 },
	{ text: '이재명관련주', id: 127 },
	{ text: '윤석열관련주', id: 128 },
	{ text: '방산관련주', id: 129 },
	{ text: '이재명관련주', id: 130 },
	{ text: '컴공관련주', id: 131 },
];

const paperData = [
	{
		id: 12342,
		title: 'Tag Refinement를 이용한 이미지 어노테이션',
		author: ['차재성', '조선영', '이영정', '김성도', '변해란'],
		conceptList: [
			'이미지 어노테이션',
			'이미지 태깅',
			'소셜 태그',
			'태그 개선',
			'Image Annotation',
			'Image Tagging',
			'Social Tag',
		],
		subjectNum: 569,
		subjectName: '전자과학',
	},
	{
		id: 12344,
		title: 'Tag Refinement를 이용한 이미지 어노테이션',
		author: ['차재성', '조선영', '이영정', '김성도', '변해란'],
		conceptList: [
			'이미지 어노테이션',
			'이미지 태깅',
			'소셜 태그',
			'태그 개선',
			'Image Annotation',
			'Image Tagging',
			'Social Tag',
		],
		subjectNum: 569,
		subjectName: '전자과학',
	},
	{
		id: 12348,
		title: 'Tag Refinement를 이용한 이미지 어노테이션',
		author: ['차재성', '조선영', '이영정', '김성도', '변해란'],
		conceptList: [
			'이미지 어노테이션',
			'이미지 태깅',
			'소셜 태그',
			'태그 개선',
			'Image Annotation',
			'Image Tagging',
			'Social Tag',
		],
		subjectNum: 569,
		subjectName: '전자과학',
	},
];

/*------------------------------------------------------------ */

export const getRecommandPaperData = async () => {
	// const res = await request("GET", "URL", "DATA");

	return paperData;
};

export const getAdjacentSubjectLabels = async () => {
	// const res = await request("GET", "URL", "DATA");

	return tempSubjectLabels;
};

export const getSubLabels = async () => {
	// const res = await request("GET","URL", "DATA");
	return tempSubjectLabels;
};
