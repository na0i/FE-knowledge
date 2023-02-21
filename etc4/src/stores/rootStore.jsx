import { counter } from './counter';
import { searchStore } from './searchStore';
import { autoCompleteStore } from './autoCompleteStore';
import { searchFilterStore } from './searchFilterStore';

const rootStore = () => ({
	counter,
	searchStore,
	autoCompleteStore,
	searchFilterStore,
});

export default rootStore;
