import { counter } from './counter';
import { modalStore } from './modalStore';
import { dropdownStore } from './dropdownStore';

const rootStore = () => ({
	counter,
	modalStore,
	dropdownStore,
});

export default rootStore;
//mobx rootStore 기본설정 예제
