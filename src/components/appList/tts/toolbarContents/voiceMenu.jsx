import React, { useState } from 'react';
import styled from 'styled-components';

import { VoiceSelectDropdown } from './voiceSelectDropdown';
import { ReactComponent as ProfileIcon } from 'src/assets/TTS-profile.svg';

const voiceOptions = [
	{ id: 0, value: '남자1', selected: true },
	{ id: 1, value: '남자2', selected: false },
	{ id: 2, value: '남자3', selected: false },
	{ id: 3, value: '여자1', selected: false },
	{ id: 4, value: '여자2', selected: false },
];

export const VoiceMenu = () => {
	const [voice, setVoice] = useState(voiceOptions[0].value);
	const [openVoice, setOpenVoice] = useState(false);

	const handleVoiceDropdown = () => {
		setOpenVoice(!openVoice);
	};

	return (
		<div>
			<ProfileIcon onClick={handleVoiceDropdown} width={20} />
			<VoiceSelectDropdown open={openVoice} options={voiceOptions} setOptions={setVoice} />
		</div>
	);
};
