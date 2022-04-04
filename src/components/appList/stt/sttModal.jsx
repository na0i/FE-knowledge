import React from 'react';
import { Modal } from 'src/components/modal/modal';
import { SttModalContents } from './modalContents/sttModalContents';

export const SttModal = ({ open, onClose }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			width={'1200px'}
			height={'80vh'}
			children={<SttModalContents onClose={onClose} />}
		></Modal>
	);
};
