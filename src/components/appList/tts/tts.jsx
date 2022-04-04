import React, { useState } from 'react';
import { AppButton } from 'src/components/button/button';
import { ReactComponent as TTS } from 'src/assets/TTS.svg';
import { TtsDropdown } from './ttsDropdown';

export const Tts = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{/* <AppButton icon={<TTS width={45} height={45} />} text={'TTS'} onClick={openDropdown}></AppButton> */}
			<AppButton icon={<TTS width={45} height={45} />} text={'TTS'}></AppButton>
			{/* <TtsDropdown open={isOpen}></TtsDropdown> */}
		</>
	);
};
