import { request } from 'src/utils/axios';

// API 함수 예시

export const getTTS = async ({ data }, ...props) => {
	const res = await request('GET', 'URL', data);

	return res;
};
