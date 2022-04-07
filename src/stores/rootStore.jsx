import { counter } from './counter';
import { sttStore } from './sttStore';
import { ttsStore } from './ttsStore';
import { dropdownStore } from './dropdownStore';

const rootStore = () => ({
	counter,
	sttStore,
	ttsStore,
	dropdownStore,
});

export default rootStore;
//mobx rootStore 기본설정 예제
