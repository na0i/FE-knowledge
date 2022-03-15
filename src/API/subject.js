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
	{ id: 340, text: '생명', category: 'M', refId: 335 },
	{ id: 341, text: '공학', category: 'M', refId: 335 },
	{ id: 342, text: '수학', category: 'M', refId: 0 },
	{ id: 343, text: '역사학', category: 'M', refId: 0 },
	{ id: 344, text: '지질학', category: 'M', refId: 0 },
	{ id: 345, text: '생명', category: 'M', refId: 0 },
	{ id: 346, text: '공학', category: 'M', refId: 0 },
	{ id: 347, text: '수학', category: 'M', refId: 0 },
	{ id: 348, text: '역사학', category: 'M', refId: 0 },
	{ id: 349, text: '지질학', category: 'M', refId: 0 },
	{ id: 350, text: '생명', category: 'L', refId: 0 },
	{ id: 351, text: '공학', category: 'L', refId: 0 },
	{ id: 352, text: '수학', category: 'L', refId: 0 },
	{ id: 353, text: '역사학', category: 'L', refId: 0 },
	{ id: 354, text: '지질학', category: 'L', refId: 0 },
];

/*------------------------------------------------------------ */

export const getAdjacentSubjectLabels = async () => {
	// const res = await request("GET", "URL", "DATA");

	return tempSubjectLabels;
};

export const getSubLabels = async () => {
	// const res = await request("GET","URL", "DATA");
	return tempSubjectLabels;
};
