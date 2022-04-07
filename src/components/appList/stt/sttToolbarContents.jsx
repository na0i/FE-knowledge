import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import rootStore from 'src/stores/rootStore';

import { ReactComponent as UploadIcon } from 'src/assets/Toolbar-upload.svg';
import { ReactComponent as MicIcon } from 'src/assets/Toolbar-mic.svg';
import { ReactComponent as SettingsIcon } from 'src/assets/Toolbar-settings.svg';

export const SttToolbarContents = observer(() => {
	const { sttStore } = rootStore();

	return (
		<ContentsWrapper>
			<UploadIcon width={25} height={25} />
			<MicIcon width={25} height={25} />
			<SettingsIcon width={25} height={25} onClick={() => sttStore.openModal()} />
		</ContentsWrapper>
	);
});

const ContentsWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	&:hover {
		cursor: pointer;
	}
`;
