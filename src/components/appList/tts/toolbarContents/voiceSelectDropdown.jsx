import React from 'react';
import styled from 'styled-components';

export const VoiceSelectDropdown = ({ open, left, options, setOptions }) => {
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
		<Frame open={open} left={left}>
			{options.map((option) => {
				return (
					<Option selected={option.selected} key={option.id} onClick={() => changeSelect(option.id)}>
						{option.value}
					</Option>
				);
			})}
		</Frame>
	);
};

const Frame = styled.div`
	display: ${(props) => (props.open ? 'block' : 'none')};
	z-index: 100;
	position: absolute;
	/* top: 80%;
	left: 29%; */
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
