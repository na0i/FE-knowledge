import { observable } from 'mobx';

const appStore = observable({
	// state
	openAppName: '',
	dropdownMenuId: 99,
	isDropdownOpen: false,
	isTtsModalOpen: false,

	// STT state
	isSttSettingModalOn: false,
	isSttToolbarOpen: false,

	// action
	handleDropdown(appName) {
		if (this.openAppName === appName) {
			this.isDropdownOpen = !this.isDropdownOpen;
		} else {
			this.isDropdownOpen = true;
		}
		this.openAppName = appName;
	},

	openMenu(appName, menuId) {
		this.dropdownMenuId = menuId;
		if (appName === 'STT' && this.dropdownMenuId === 0) {
			this.isSttToolbarOpen = true;
		} else if (appName === 'TTS') {
			this.isTtsModalOpen = true;
			this.isSttToolbarOpen = false;
		}
	},

	closeMenu(appName) {
		this.dropdownMenuId = 99;
		if (appName === 'STT') {
			this.isSttToolbarOpen = false;
		} else if (appName === 'TTS') {
			this.isTtsModalOpen = false;
		}
	},

	openModal() {
		this.isSttSettingModalOn = true;
	},

	closeModal() {
		this.isSttSettingModalOn = false;
	},
});

export { appStore };
