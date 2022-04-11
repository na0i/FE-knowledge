import React from 'react';
import { AppButtonDropdown } from 'src/components/dropdown/dropdown';
import { ReactComponent as SpeechIcon } from 'src/assets/TTS-speech.svg';

const ttsDropdownContents = [
	{
		id: 0,
		icon: <SpeechIcon width={17} height={17} />,
		text: '텍스트 음성으로 변환하기',
		desc: '텍스트를 입력하고 원하는 보이스로 음성을 만들어보세요 :)',
	},
];

export const TtsDropdown = ({ appName, open, onClose }) => {
	return (
		<AppButtonDropdown
			appName={appName}
			open={open}
			onClose={onClose}
			width={'230px'}
			height={'90px'}
			children={ttsDropdownContents}
		></AppButtonDropdown>
	);
};
