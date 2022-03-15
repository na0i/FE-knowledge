import { counter } from './counter';
import { searchStore } from './searchStore'

const rootStore = () => ({
	counter,
	searchStore,
});

export default rootStore;
