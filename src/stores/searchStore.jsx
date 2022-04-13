import { observable } from 'mobx';

const searchStore = observable({
	// state
	interestedPapers: [],
	flag: true,

	// action
	getInterestedPapers() {
		if (localStorage.getItem('interestedPapers')) {
			let interestedPapers = JSON.parse(localStorage.getItem('interestedPapers'));
			this.interestedPapers = interestedPapers;
		} else {
			this.interestedPaper = [];
		}
	},

	addInterestedPaper(item) {
		this.flag = !this.flag;
		if (this.interestedPapers.findIndex((element) => element.id === item.id) === -1) {
			this.interestedPapers = [...this.interestedPapers, item];
			localStorage.setItem('interestedPapers', JSON.stringify(this.interestedPapers));
		}
	},

	removeInterestedPaper(item) {
		this.flag = !this.flag;
		this.interestedPapers = this.interestedPapers.filter((element) => element.id !== item.id);
		localStorage.setItem('interestedPapers', JSON.stringify(this.interestedPapers));
	},
});

export { searchStore };
