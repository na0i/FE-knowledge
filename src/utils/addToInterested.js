// list: 관심있는 paperList
// item: paper({id: x, title: 'x'})
export const addToInterested = (list, item) => {
	let newArr = [];
	newArr = [...list, item];
	localStorage.setItem('interestedPapers', JSON.stringify(newArr));
};
