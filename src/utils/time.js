export const sec2min = (time) => {
	let min = Math.floor(time / 60);
	let sec = Math.floor(time - min * 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min}:${sec}`;
};
