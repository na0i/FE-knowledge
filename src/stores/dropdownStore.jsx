import { observable } from 'mobx';
import { DropdownList } from 'src/components/dropdown/dropdownList';

const dropdownStore = observable({
	// state
	selectedAppId: 99,
	dropdown: '',
	isDropdownOpen: false,

	// action
	handleDropdown(app_id) {
		this.selectedAppId = app_id;
		let newDropdown = DropdownList?.filter((dropdown) => dropdown.key === app_id)[0].children;
		this.dropdown = newDropdown;

		if (this.selectedAppId === app_id) {
			this.isDropdownOpen = !this.isDropdownOpen;
		} else {
			this.isDropdownOpen = true;
		}
	},
});

export { dropdownStore };
