import React from 'react';
import { Modal } from 'src/components/modal/modal';
import { SttToolbarContents } from './modalContents/sttToolbarContents';
export const SttToolbar = ({ open, onClose }) => {
	return (
		<Modal open={open} onClose={onClose} width={'200px'} height={'70px'} children={<SttToolbarContents />}></Modal>
	);
};
