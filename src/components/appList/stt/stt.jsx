import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { sttStore } from 'src/stores/sttStore';
import { AppButton } from 'src/components/button/button';
import { SttModal } from './sttModal';
import { SttDropdown } from './sttDropdown';
import { ReactComponent as STT } from 'src/assets/STT.svg';

export const Stt = observer(() => {
	return (
		<Frame>
			<AppButton
				icon={<STT width={45} height={45} />}
				text={'STT'}
				onClick={() => sttStore.openDropdown()}
			></AppButton>
			<SttModal open={sttStore.isSettingModalOn} onClose={() => sttStore.closeModal()} />
			<SttDropdown open={sttStore.isSttDropdownOpen} />
		</Frame>
	);
});

const Frame = styled.div`
	position: relative;
`;
