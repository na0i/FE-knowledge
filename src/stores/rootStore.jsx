import { counter } from './counter';
import { modalStore } from './modalStore';

const rootStore = () => ({
	counter,
	modalStore,
});

export default rootStore;
//mobx rootStore 기본설정 예제
