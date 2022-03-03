// const { request } = require('src/utils/axios');

/************************************* temp *************************************/

const paperInfoTemp = {
	id: 2302,
	title: {
		ko: `커뮤니티 기반의 질의 응답서비스(cQA)에서 질문-응답 쌍의 구조적 특징을 이용한 언어 모델 기반의 주제 분류 기법`,
		en: `A topic classification technique based on a language model using the structural characteristics of a question-answer pair in a community-based question-and-answer service (cQA)`,
	},
	authors: ['배경만', '고영종', '김종훈'],
	concepts: ['커뮤니티 기반 질의-응답 서비스', '언어모델', 'Topic Classification', 'cQA Service', 'Language Model'],
	keyword: { number: 569, subject: '전자과학' },
	issuer: '한국정보과학회',
	journal: '정보과학회논문지 : 소프트웨어 및 응용',
	recommendations: 'Vol.39 No.8 [2012]',
	year: '2012',
	language: 'Korean',
	listing: 'KCI',
	form: '학술저널',
	page: '664-671(8쪽)',
	citations: 2,
	source: 'F NDSL, W DBpia',
	holdingInstitution: '영남대학교 과학도서관',
};

const paperRecommendTemp = [
	{
		id: 2305,
		title: `커뮤니티 기반의 질의 응답서비스(cQA)에서 질문-응답 쌍의 구조적 특징을 이용한 언어 모델 기반의 주제 분류 기법`,
		authors: ['배경만', '고영종', '김종훈'],
		concepts: [
			'커뮤니티 기반 질의-응답 서비스',
			'언어모델',
			'Topic Classification',
			'cQA Service',
			'Language Model',
		],
		keyword: { number: 569, subject: '전자과학' },
	},
	{
		id: 2398,
		title: `K-means 클러스터링을 이용한 압축 기반 이상 탐지`,
		authors: ['안종하', '김대원'],
		concepts: ['이상 탐지', '로그 압축', '유전 알고리즘', 'cQA Service'],
		keyword: { number: 569, subject: '전자과학' },
	},
];

/************************************ function ************************************/

export const getPaperInfo = (id) => {
	// const res = request('GET', `url?id=${id}`);
	// if (res.result) return res.result;

	return paperInfoTemp;
};

export const getPaperRecommend = (id) => {
	// const res = request('GET', `url?id=${id}`);
	// if (res.result) return res.result;

	return paperRecommendTemp;
};
