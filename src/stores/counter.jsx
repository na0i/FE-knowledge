import { observable } from 'mobx';

const counter = observable({
	number: 1,
	increase() {
		this.number++;
	},
	decrease() {
		this.number--;
	},
});

export { counter };
//mobx 기본설정 예제
