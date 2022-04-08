import { counter } from './counter';
import { appStore } from './appStore';

const rootStore = () => ({
	counter,
	appStore,
});

export default rootStore;
//mobx rootStore 기본설정 예제
