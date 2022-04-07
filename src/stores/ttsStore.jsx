import { observable } from 'mobx';

const ttsStore = observable({
	// state
	isTtsDropdownOpen: false,
	isSettingModalOn: false,

	// action
	openDropdown() {
		this.isTtsDropdownOpen = true;
	},

	closeDropdown() {
		this.isTtsDropdownOpen = false;
	},
	openModal() {
		this.isSettingModalOn = true;
	},

	closeModal() {
		this.isSettingModalOn = false;
	},
});

export { ttsStore };
