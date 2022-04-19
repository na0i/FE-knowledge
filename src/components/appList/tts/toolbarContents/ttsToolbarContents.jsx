import React, { useState } from 'react';
import styled from 'styled-components';

import { TextMenu } from './textMenu';
import { VoiceMenu } from './voiceMenu';
import { PlayMenu } from './playMenu';
import { PlaySpeedMenu } from './playSpeedMenu';

export const TtsToolbarContents = () => {
	return (
		<>
			<ContentsWrapper>
				<TextMenu />
				<VoiceMenu />
				<PlayMenu />
				<PlaySpeedMenu />
			</ContentsWrapper>
		</>
	);
};

const ContentsWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	&:hover {
		cursor: pointer;
	}
`;

const X1button = styled.button`
	border: none;
	background-color: white;
	width: 20px;
	display: flex;
	justify-content: center;
	cursor: pointer;
`;
