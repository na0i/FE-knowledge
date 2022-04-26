import React from 'react';
import styled from 'styled-components';

export const SelectButton = ({ text, selected, onClick, width, height }) => {
	return (
		<ButtonForm width={width} height={height} onClick={onClick} selected={selected}>
			{text}
		</ButtonForm>
	);
};

const ButtonForm = styled.button`
	width: ${(props) => `${props.width}`};
	height: ${(props) => `${props.height}`};
	${(props) => (props.selected ? `background-color: #0f1a83; color: white;` : `background-color: white;`)}
	font-family: 'noto sans KR';
	border-radius: 10px;
	border: 1px solid #0f1a83;
	cursor: pointer;
`;
