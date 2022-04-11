import React from 'react';
import { observer } from 'mobx-react-lite';
import { appStore } from 'src/stores/appStore';
import { AppButton } from 'src/components/button/button';
import { SttModal } from './sttModal';
import { SttDropdown } from './sttDropdown';
import { SttToolbar } from './sttToolbar';
import { ReactComponent as STT } from 'src/assets/STT.svg';

export const Stt = observer(() => {
	const appName = 'STT';
	return (
		<>
			<AppButton
				icon={<STT width={45} height={45} />}
				text={'STT'}
				onClick={() => appStore.handleDropdown(appName)}
			></AppButton>
			<SttDropdown appName={appName} open={appStore.isDropdownOpen} onClose={() => appStore.handleDropdown('')} />
			<SttModal open={appStore.isSttSettingModalOn} onClose={() => appStore.closeModal()} />
			<SttToolbar open={appStore.isSttToolbarOpen} onClose={() => appStore.closeMenu(appName)} />
		</>
	);
});
