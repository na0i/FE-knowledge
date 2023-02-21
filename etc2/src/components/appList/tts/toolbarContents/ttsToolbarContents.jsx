import React, { useState } from 'react';
import styled from 'styled-components';

import { TextMenu } from './textMenu';
import { VoiceMenu } from './voiceMenu';
import { PlayMenu } from './playMenu';
import { PlaySpeedMenu } from './playSpeedMenu';

export const TtsToolbarContents = () => {
	const ttsToolbarMenuList = [
		{ key: 0, value: <TextMenu /> },
		{ key: 1, value: <VoiceMenu /> },
		{ key: 2, value: <PlayMenu /> },
		{ key: 3, value: <PlaySpeedMenu /> },
	];

	return (
		<ContentsWrapper>
			{ttsToolbarMenuList.map((menu) => {
				return <>{menu.value}</>;
			})}
		</ContentsWrapper>
	);
};

const ContentsWrapper = styled.div`
	position: relative;
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
