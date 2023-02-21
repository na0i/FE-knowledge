import React from 'react';

import { AppButton } from 'src/components/button/button';
import { ReactComponent as TTS } from 'src/assets/TTS.svg';
import { TtsDropdown } from './ttsDropdown';
import { TtsModal } from './ttsModal';
import { observer } from 'mobx-react-lite';
import { appStore } from 'src/stores/appStore';
import { TtsToolbar } from './ttsToolbar';

export const Tts = observer(() => {
	const appName = 'TTS';

	return (
		<>
			<AppButton
				icon={<TTS width={45} height={45} />}
				text={'TTS'}
				onClick={() => appStore.handleDropdown(appName)}
			></AppButton>
			<TtsDropdown appName={appName} open={appStore.isDropdownOpen} onClose={() => appStore.handleDropdown('')} />
			{/* <TtsModal appName={appName} open={appStore.isTtsModalOpen} onClose={() => appStore.closeMenu(appName)} /> */}
			<TtsToolbar open={appStore.isTtsModalOpen} onClose={() => appStore.closeMenu(appName)} />
		</>
	);
});
