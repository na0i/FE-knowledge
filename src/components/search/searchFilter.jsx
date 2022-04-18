import React from 'react';
import { FilterDropDown } from '../button/filterDropdown';
import { observer } from 'mobx-react-lite';
import rootStore from 'src/stores/rootStore';

const tempData = [
	{ key: 1, value: '논문', name: '논문' },
	{ key: 2, value: '개념어', name: '개념어' },
	{ key: 3, value: '주제어', name: '주제어' },
];

export const SearchFilter = observer(() => {
	const { searchFilterStore, autoCompleteStore } = rootStore();

	const handleFilter = (obj) => {
		searchFilterStore.setSearchFilterName(obj.value);
		autoCompleteStore.setAutoCompleteData([]);
	};

	return (
		<FilterDropDown
			width={100}
			data={tempData}
			value={searchFilterStore.searchFilterName}
			onSelect={handleFilter}
		/>
	);
});
