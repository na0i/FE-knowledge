import React from 'react';
import { AppButton } from 'src/components/button/button';
import { ReactComponent as TTS } from 'src/assets/TTS.svg';
import { TtsDropdown } from './ttsDropdown';
import { observer } from 'mobx-react-lite';
import { ttsStore } from 'src/stores/ttsStore';

export const Tts = observer(() => {
	return (
		<>
			<AppButton
				icon={<TTS width={45} height={45} />}
				text={'TTS'}
				onClick={() => ttsStore.openDropdown()}
			></AppButton>
			<TtsDropdown open={ttsStore.isTtsDropdownOpen} />
		</>
	);
});
