// newItem: {id: x, title: 'x'}

export const removeFromInterested = (item) => {
	const interestedPapersList = JSON.parse(localStorage.getItem('interestedPapers'));
	if (interestedPapersList.findIndex((element) => element.id === item.id) !== -1) {
		let newArr = [];
		newArr = interestedPapersList.filter((element) => element.id !== item.id);
		localStorage.setItem('interestedPapers', JSON.stringify(newArr));
	}
};
