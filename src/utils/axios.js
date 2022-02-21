import axios from 'axios';

export const request = async (method, url, data) => {
	document.body.style.cursor = 'wait';
	return axios({
		method,
		// url: process.env.NODE_ENV === 'development' ? '' : url,
		url: url,
		data,
	})
		.then((res) => {
			document.body.style.cursor = 'default';
			return res.data;
		})
		.catch((err) => console.log(err));
};
