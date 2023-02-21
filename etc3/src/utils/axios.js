import axios from 'axios';

//api 호출 관련 함수
export const request = async (method, url, data) => {
	document.body.style.cursor = 'wait';
	return axios({
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		method,
		url: `https://hyperbrain.ai/${url}`,
		data: data,
	})
		.then((res) => {
			document.body.style.cursor = 'default';
			return res.data;
		})
		.catch((err) => console.log(err));
};
