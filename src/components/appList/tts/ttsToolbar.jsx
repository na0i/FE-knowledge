import React from 'react';
import { Toolbar } from 'src/components/toolbar/toolbar';
import { SttToolbarContents } from './sttToolbarContents';

export const ttsToolbar = ({ open, onClose }) => {
	return (
		<Toolbar
			open={open}
			onClose={onClose}
			width={'200px'}
			height={'70px'}
			children={<SttToolbarContents />}
		></Toolbar>
	);
};
