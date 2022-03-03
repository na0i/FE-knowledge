import React from 'react';
import styled from 'styled-components';

export const SubjectButton = ({ text, onClick }) => {
	return <LabelButton onClick={onClick}>{text}</LabelButton>;
};

const LabelButton = styled.button`
	width: 32%;
	padding: 5px 10px;
	margin: 0.5%;
	border-radius: 5px;
	border: 1px solid #b9d7eb;
	background-color: white;
`;
