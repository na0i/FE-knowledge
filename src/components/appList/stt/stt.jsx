import React from 'react';
import { modalStore } from 'src/stores/modalStore';
import { AppButton } from 'src/components/button/button';
import { ReactComponent as STT } from 'src/assets/STT.svg';
import { SttModal } from './sttModal';
import { observer } from 'mobx-react-lite';

export const Stt = observer(() => {
	return (
		<>
			<AppButton icon={<STT width={45} height={45} />} text={'STT'}></AppButton>
			<SttModal open={modalStore.isSettingModalOn} onClose={() => modalStore.closeModal()}></SttModal>
		</>
	);
});
