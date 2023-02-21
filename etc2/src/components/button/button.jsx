import React from 'react';
import styled from 'styled-components';

export const AppButton = ({ icon, text, onClick }) => {
	return (
		<Button onClick={onClick}>
			<Icon>{icon}</Icon>
			{text}
		</Button>
	);
};

const Button = styled.button`
	padding: 5px 10px;
	display: flex;
	flex-direction: column;
	border: none;
	background-color: white;
	justify-content: center;
	align-items: center;
	font-size: 1.1rem;
	font-weight: bold;
	cursor: pointer;

	:hover {
		color: #b1b1b1;
		fill: #b1b1b1;
		transition-duration: 0.1s;
	}
`;

const Icon = styled.div`
	z-index: 500;
	padding: 5px;
	border: 3px solid #212121;
	border-radius: 5px;

	:hover {
		border-color: #b1b1b1;
	}
`;
