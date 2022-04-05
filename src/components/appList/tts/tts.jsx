import React from 'react';
import { AppButton } from 'src/components/button/button';
import { ReactComponent as TTS } from 'src/assets/TTS.svg';

export const Tts = () => {
	return (
		<>
			<AppButton icon={<TTS width={45} height={45} />} text={'TTS'}></AppButton>
		</>
	);
};
