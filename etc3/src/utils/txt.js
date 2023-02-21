export const downloadTxt = (val) => {
	const el = document.createElement('a');
	const file = new Blob([val], { type: 'text/plain' });
	el.href = URL.createObjectURL(file);
	el.download = 'sample.txt';
	document.body.appendChild(el);
	el.click();
};

export const copyTxt = (val) => {
	navigator.clipboard.writeText(val).then(alert('복사되었습니다.'));
};
