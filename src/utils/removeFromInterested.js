// list: 관심있는 paperList
// item: paper({id: x, title: 'x'})
export const removeFromInterested = (list, item) => {
	let newArr = [];
	newArr = list.filter((element) => element.id !== item.id);
	localStorage.setItem('interestedPapers', JSON.stringify(newArr));
};
