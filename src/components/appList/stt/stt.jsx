import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { appStore } from 'src/stores/appStore';
import { AppButton } from 'src/components/button/button';
import { SttModal } from './sttModal';
import { SttDropdown } from './sttDropdown';
import { ReactComponent as STT } from 'src/assets/STT.svg';

export const Stt = observer(() => {
	const appName = 'STT';
	const WrapperEl = useRef();
	const handleClickOutside = (event) => {
		if (appStore.openAppName === appName && !WrapperEl.current.contains(event.target)) {
			appStore.handleDropdown('');
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
	});

	return (
		<>
			<WrapperRef ref={WrapperEl}>
				<AppButton
					icon={<STT width={45} height={45} />}
					text={'STT'}
					onClick={() => appStore.handleDropdown(appName)}
				></AppButton>
				<SttDropdown appName={appName} />
			</WrapperRef>
			<SttModal open={appStore.isSettingModalOn} onClose={() => appStore.closeModal()} />
		</>
	);
});

const WrapperRef = styled.div``;
