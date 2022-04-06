import { SttDropdown } from '../appList/stt/sttDropdown';
import { TtsDropdown } from '../appList/tts/ttsDropdown';
import rootStore from 'src/stores/rootStore';

const { dropdownStore } = rootStore();

export const DropdownList = [
	{ key: 1, children: <SttDropdown /> },
	{ key: 2, children: <TtsDropdown /> },
];
