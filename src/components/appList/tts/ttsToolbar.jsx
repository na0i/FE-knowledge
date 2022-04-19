import React from 'react';
import { Toolbar } from 'src/components/toolbar/toolbar';
import { TtsToolbarContents } from './ttsToolbarContents';

export const TtsToolbar = ({ open, onClose }) => {
	return (
		<Toolbar
			open={open}
			onClose={onClose}
			width={'250px'}
			height={'70px'}
			children={<TtsToolbarContents />}
		></Toolbar>
	);
};
