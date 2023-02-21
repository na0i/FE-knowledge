import { observable } from 'mobx';

const searchFilterStore = observable({
	// state
	searchFilterName: '논문',
	flag: true,

	// action
	setSearchFilterName(val) {
		this.searchFilterName = val;
	},
});

export { searchFilterStore };
