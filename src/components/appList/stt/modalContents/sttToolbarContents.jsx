import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from 'src/assets/Toolbar-upload.svg';
import { ReactComponent as MicIcon } from 'src/assets/Toolbar-mic.svg';
import { ReactComponent as SettingsIcon } from 'src/assets/Toolbar-settings.svg';

export const SttToolbarContents = () => {
	return (
		<ContentsWrapper>
			<UploadIcon width={25} height={25}></UploadIcon>
			<MicIcon width={25} height={25}></MicIcon>
			<SettingsIcon width={25} height={25}></SettingsIcon>
		</ContentsWrapper>
	);
};

const ContentsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;
