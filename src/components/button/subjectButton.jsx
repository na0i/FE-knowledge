import React from 'react';
import styled from 'styled-components';

export const RouteButton = ({ text, onClick }) => {
	return <RouteClickButton onClick={onClick}>{text}</RouteClickButton>;
};

export const LabelButton = ({ text, onClick }) => {
	return <LabelClickButton onClick={onClick}>{text}</LabelClickButton>;
};

const LabelClickButton = styled.button`
	width: 32%;
	padding: 5px 10px;
	margin: 0.5%;
	border-radius: 5px;
	border: 1px solid #b9d7eb;
	background-color: white;
`;

const RouteClickButton = styled.button`
	width: 32%;
	padding: 5px 10px;
	margin: 0.5%;
	border-radius: 5px;
	border: 1px solid #d4ebb9;
	background-color: white;
`;
