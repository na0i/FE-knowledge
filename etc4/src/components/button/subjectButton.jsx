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
	padding: 5px 10px;
	font-size: 0.75rem;
	margin: 0.5%;
	border-radius: 5px;
	border: 1px solid #dadce0;
	color: #616161;
	background-color: white;
	white-space: nowrap;
	cursor: pointer;
	text-overflow: ellipsis;
	overflow: hidden;
	:hover {
		transition-duration: 0.2s;
		border: 1px solid var(--color-orange-point);
		color: var(--color-orange-point);
	}
`;
