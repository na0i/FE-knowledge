import React from 'react';
import styled from 'styled-components';

export const SubInfo = ({ text }) => {
	return (
		<InfoBox>
			<SubLine />
			<TextForm>{text}</TextForm>
			<SubLine />
		</InfoBox>
	);
};

const InfoBox = styled.div`
	width: 800px;
	text-align: center;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 1rem 0;
`;

const TextForm = styled.span`
	width: 400px;
	font-size: 0.875rem;
`;

const SubLine = styled.div`
	width: 120px;
	border-top: 1px solid #0f1a83;
	height: 1px;
`;
