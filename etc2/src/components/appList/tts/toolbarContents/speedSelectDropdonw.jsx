import React from 'react';
import styled from 'styled-components';

export const SpeedSelectDropdown = ({ open, right, options, setOptions, handleSpeedDropdown }) => {
	const changeSelect = (id) => {
		let optionsTemp = options;
		optionsTemp.forEach((option) => {
			if (option.id === id) {
				option.selected = true;
				setOptions(option.value);
			} else option.selected = false;
		});
	};

	return (
		<>
			<DropdownWrapper open={open} onClick={() => handleSpeedDropdown(false)}></DropdownWrapper>
			<Frame open={open} right={right}>
				{options.map((option) => {
					return (
						<Option selected={option.selected} key={option.id} onClick={() => changeSelect(option.id)}>
							{option.value}
						</Option>
					);
				})}
			</Frame>
		</>
	);
};

const DropdownWrapper = styled.div`
	/* display: ${(props) => (props.open ? 'block' : 'none')};
	z-index: 100;
	background-color: black;
	position: fixed;
	padding: 0;
	margin: 0;
	width: 100vw;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0; */
`;

const Frame = styled.div`
	position: absolute;
	/* top: 80%;
	left: 80%; */
	display: ${(props) => (props.open ? 'block' : 'none')};
	z-index: 100;
	width: 40px;
	background-color: white;
`;

const Option = styled.div`
	border: 1px solid #d4d4d4;
	font-size: 13px;
	padding: 5px;
	text-align: center;
	color: #797979;
	background-color: ${(props) => (props.selected ? '#e0f6ff' : 'white')};
	cursor: pointer;
`;
