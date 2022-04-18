import { observable, runInAction } from 'mobx';
import { getAutoComplete } from 'src/API/search';

const tempConceptLabels = [
	{ text: '언어모델', id: 654 },
	{ text: 'Topic Classification', id: 655 },
	{ text: 'cQA Service', id: 656 },
	{ text: 'Language Model', id: 657 },
	{ text: '커뮤니티 기반', id: 658 },
	{ text: '로그 압축', id: 659 },
	{ text: '유전 알고리즘', id: 670 },
	{ text: '자기', id: 671 },
];

const autoCompleteStore = observable({
	// state
	autoCompleteData: [],
	flag: true,

	// action
	async getAutoCompleteData(text) {
		const res = await getAutoComplete('GET', 'url');
		runInAction(() => {
			if (text?.includes('학술')) this.autoCompleteData = res;
			else this.autoCompleteData = [];
		});
	},

	async getConceptCompleteData(text) {
		this.autoCompleteData = tempConceptLabels?.filter((item) => item.text.includes(text));
	},

	setAutoCompleteData(val) {
		this.autoCompleteData = val;
	},
});

export { autoCompleteStore };
