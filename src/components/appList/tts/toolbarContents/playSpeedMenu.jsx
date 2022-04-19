import React, { useState } from 'react';
import styled from 'styled-components';
import { SpeedSelectDropdown } from './speedSelectDropdonw';

const playSpeedOptions = [
	{ id: 0, value: '0.5', selected: false },
	{ id: 1, value: '0.75', selected: false },
	{ id: 2, value: '1', selected: true },
	{ id: 3, value: '1.25', selected: false },
	{ id: 4, value: '1.5', selected: false },
];

export const PlaySpeedMenu = () => {
	const [openSpeed, setOpenSpeed] = useState(false);
	const [playSpeed, setPlaySpeed] = useState(playSpeedOptions[2].value);

	const handleSpeedDropdown = () => {
		setOpenSpeed(!openSpeed);
	};
	return (
		<>
			<X1button onClick={handleSpeedDropdown}>x{playSpeed}</X1button>
			<SpeedSelectDropdown
				onClose={handleSpeedDropdown}
				open={openSpeed}
				options={playSpeedOptions}
				setOptions={setPlaySpeed}
			/>
		</>
	);
};

const X1button = styled.button`
	border: none;
	background-color: white;
	width: 20px;
	display: flex;
	justify-content: center;
	cursor: pointer;
`;
