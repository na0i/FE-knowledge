// newItem: {id: x, title: 'x'}

export const addToInterested = (item) => {
	const interestedPapersList = JSON.parse(localStorage.getItem('interestedPapers'));
	if (interestedPapersList.findIndex((element) => element.id === item.id) === -1) {
		let newItem = {};
		newItem.id = item.id;
		newItem.title = item.title;

		let newArr = [];
		newArr = [...interestedPapersList, newItem];
		localStorage.setItem('interestedPapers', JSON.stringify(newArr));
	}
};
