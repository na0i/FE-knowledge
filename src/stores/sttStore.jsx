import { observable } from 'mobx';

const sttStore = observable({
	// state
	isSttDropdownOpen: false,
	isSettingModalOn: false,

	// action
	openDropdown() {
		this.isSttDropdownOpen = true;
	},

	closeDropdown() {
		this.isSttDropdownOpen = false;
	},

	openModal() {
		this.isSettingModalOn = true;
	},

	closeModal() {
		this.isSettingModalOn = false;
	},
});

export { sttStore };
