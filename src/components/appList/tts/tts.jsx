import React from 'react';
import { AppButton } from 'src/components/button/button';
import { ReactComponent as TTS } from 'src/assets/TTS.svg';
import { TtsDropdown } from './ttsDropdown';
import { observer } from 'mobx-react-lite';
import { appStore } from 'src/stores/appStore';

export const Tts = observer(() => {
	const appName = 'TTS';

	return (
		<>
			<AppButton
				icon={<TTS width={45} height={45} />}
				text={'TTS'}
				onClick={() => appStore.handleDropdown(appName)}
			></AppButton>
			<TtsDropdown appName={appName} />
		</>
	);
});
