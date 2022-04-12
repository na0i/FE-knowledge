import React from 'react';
import styled from 'styled-components';

export const RouteButton = ({ text, onClick }) => {
	return (
		<LabelClickButton borderColor="#d4ebb9" onClick={onClick}>
			{text}
		</LabelClickButton>
	);
};

export const LabelButton = ({ text, onClick }) => {
	return (
		<LabelClickButton borderColor="#b9d7eb" onClick={onClick}>
			{text}
		</LabelClickButton>
	);
};

const LabelClickButton = styled.button`
	width: 32%;
	padding: 5px 10px;
	margin: 0.5%;
	border-radius: 5px;
	border: 1px solid ${(props) => `${props.borderColor}`};
	background-color: white;
	white-space: nowrap;
	cursor: pointer;
	text-overflow: ellipsis;
	overflow: hidden;
	:hover {
		transition-duration: 0.5s;
		background-color: #f9f9f9;
	}
`;
