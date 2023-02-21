import { observable } from 'mobx';
//지금 안쓰는파일 (22.04.21)

const optionStore = observable({
	//state
	compList: [
		{
			text: '실시간 음성 변환하기',
			subText: '마이크로부터 실시간으로 음성을 입력받아 텍스트로 변환해주는 기술',
			selected: true,
		},
		{
			text: '음성 파일 변환하기',
			subText: '녹음된 음성파일을 입력받아 텍스트로 변환해주는 기술',
			selected: false,
		},
		{
			text: '영상 자막 생성하기',
			subText: '업로드한 영상의 음성을 분석하여 자동으로 자막을 생성해주는 기술',
			selected: false,
		},
	],
	name: 'text',

	// action
	handleOption(idx) {
		console.log(this.name);
		console.log(this.compList);
		let arr = [...this.compList];
		arr.forEach((item, index) => (index === idx ? (item.selected = true) : (item.selected = false)));
		console.log(arr);
	},
});

export { optionStore };
