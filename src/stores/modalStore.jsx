import { observable } from 'mobx';

const modalStore = observable({
	// state
	isSettingModalOn: false,

	// action
	openModal() {
		this.isSettingModalOn = true;
	},

	closeModal() {
		this.isSettingModalOn = false;
	},
});

export { modalStore };
