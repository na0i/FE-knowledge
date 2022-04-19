import React from 'react';
import styled from 'styled-components';

import { ReactComponent as TextIcon } from 'src/assets/TTS-write.svg';
import { ReactComponent as ProfileIcon } from 'src/assets/TTS-profile.svg';
import { ReactComponent as PlayIcon } from 'src/assets/TTS-play.svg';

export const TtsToolbarContents = () => {
	return (
		<ContentsWrapper>
			<TextIcon width={20} height={20} />
			<ProfileIcon width={20} height={20} />
			<PlayIcon width={20} height={20} />
			<X1button>x 1</X1button>
		</ContentsWrapper>
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
`;
