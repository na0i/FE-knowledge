import { counter } from './counter';
import { searchStore } from './searchStore'
import { periodStore } from './periodStore';

const rootStore = () => ({
	counter,
	searchStore,
	periodStore,
})

export default rootStore;
