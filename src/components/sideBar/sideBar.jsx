import React, { useState } from 'react';
import styled from 'styled-components';
import { SttDropdown } from '../appList/stt/sttDropdown';
import { TtsDropdown } from '../appList/tts/ttsDropdown';

export const SideBar = ({ appList }) => {
	const [openDropdownId, setopenDropdownId] = useState(99);
	const [dropdown, setDropdown] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const dropdownList = [
		{ id: 1, component: <SttDropdown open={isOpen} /> },
		{ id: 2, component: <TtsDropdown open={isOpen} /> },
	];

	const openDropdown = (button_id) => {
		setopenDropdownId(button_id);
		setIsOpen(!isOpen);
		const newDropdown = dropdownList.filter((dropdown) => dropdown.id === button_id);
		setDropdown(newDropdown[0]);
	};

	return (
		<FixedBar>
			<>
				{appList?.map((app) => (
					<ButtonLayer key={app.key} onClick={() => openDropdown(app.key)}>
						{app.children}
					</ButtonLayer>
				))}
			</>
			<>{dropdown.component}</>
		</FixedBar>
	);
};

const FixedBar = styled.div`
	width: 200px;
	min-height: 100%;
	position: fixed;
	right: 0;
	border-left: 1px solid #e7e7e7;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ButtonLayer = styled.div`
	padding-top: 15px;
`;
