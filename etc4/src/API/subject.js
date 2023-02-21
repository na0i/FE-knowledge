import { request } from 'src/utils/axios';

const tempSubjectLabels = [
	{ text: '항공우주', id: 124 },
	{ text: '농업', id: 125 },
	{ text: '컴공', id: 126 },
	{ text: '기계', id: 127 },
	{ text: '통신', id: 128 },
	{ text: '전기공학, 통신', id: 129 },
	{ text: '전자', id: 130 },
	{ text: '자기', id: 131 },
];

const subjectLabelTemp = [
	{ id: 335, text: '생명', category: 'L', refId: null },
	{ id: 336, text: '공학', category: 'L', refId: null },
	{ id: 337, text: '수학', category: 'L', refId: null },
	{ id: 338, text: '역사학', category: 'L', refId: null },
	{ id: 339, text: '지질학', category: 'L', refId: null },
	{ id: 340, text: '중간1', category: 'M', refId: 335 },
	{ id: 341, text: '중간2', category: 'M', refId: 335 },
	{ id: 342, text: '중간3', category: 'M', refId: 335 },
	{ id: 343, text: '중간4', category: 'M', refId: 336 },
	{ id: 344, text: '중간5', category: 'M', refId: 336 },
	{ id: 345, text: '중간6', category: 'M', refId: 337 },
	{ id: 346, text: '중간7', category: 'M', refId: 338 },
	{ id: 347, text: '중간8', category: 'M', refId: 338 },
	{ id: 348, text: '중간9', category: 'M', refId: 338 },
	{ id: 349, text: '중간10', category: 'M', refId: 339 },
	{ id: 350, text: '하단1', category: 'S', refId: 345 },
	{ id: 351, text: '하단2', category: 'S', refId: 346 },
	{ id: 352, text: '하단3', category: 'S', refId: 346 },
	{ id: 353, text: '하단4', category: 'S', refId: 349 },
	{ id: 354, text: '하단5', category: 'S', refId: 349 },
];

/*------------------------------------------------------------ */

export const getAdjacentSubjectLabels = async () => {
	// const res = await request("GET", "URL", "DATA");

	return tempSubjectLabels;
};

export const getSubjectData = async () => {
	// const res = await request("GET", "URL", "DATA");

	return subjectLabelTemp;
};

export const getSubLabels = async () => {
	// const res = await request("GET","URL", "DATA");
	return tempSubjectLabels;
};
