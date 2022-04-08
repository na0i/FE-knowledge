import React from 'react';
import { Modal } from 'src/components/modal/modal';
import { ModeSelectContents } from './modalContents/modeSelectContents';

export const TtsModal = ({ open, onClose }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			width={'1200px'}
			height={'80vh'}
			children={<ModeSelectContents onClose={onClose} />}
		></Modal>
	);
};
