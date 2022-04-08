import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { AppButton } from 'src/components/button/button';
import { ReactComponent as TTS } from 'src/assets/TTS.svg';
import { TtsDropdown } from './ttsDropdown';
import { TtsModal } from './ttsModal';
import { observer } from 'mobx-react-lite';
import { appStore } from 'src/stores/appStore';

export const Tts = observer(() => {
	const appName = 'TTS';
	const WrapperEl = useRef();
	const handleClickOutside = (event) => {
		if (appStore.openAppName === appName && !WrapperEl.current.contains(event.target)) {
			appStore.handleDropdown('');
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		// return document.removeEventListener('mousedown', handleClickOutside);
	});

	return (
		<>
			<WrapperRef ref={WrapperEl}>
				<AppButton
					icon={<TTS width={45} height={45} />}
					text={'TTS'}
					onClick={() => appStore.handleDropdown(appName)}
				></AppButton>
				<TtsDropdown appName={appName} />
			</WrapperRef>
			<TtsModal></TtsModal>
		</>
	);
});

const WrapperRef = styled.div``;
