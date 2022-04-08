import { observable } from 'mobx';

const appStore = observable({
	// state
	openAppName: '',
	isSttDropdownOpen: false,
	isSettingModalOn: false,

	// action
	handleDropdown(appName) {
		this.openAppName = appName;
	},

	openModal() {
		this.isSettingModalOn = true;
	},

	closeModal() {
		this.isSettingModalOn = false;
	},
});

export { appStore };
