import React from 'react';
import styled from 'styled-components';

export const Header = () => {
	return (
		<HeaderForm>
			<SubText>Speech To Text</SubText>
			<MainText>음성인식 (Voice Recognition)</MainText>
		</HeaderForm>
	);
};

const HeaderForm = styled.div`
	display: flex;
	flex-direction: column;
	height: 10%;
	text-align: center;
	padding: 2rem;
`;

const MainText = styled.div`
	font-size: 3rem;
	color: #0f1a83;
	font-weight: 700;
`;

const SubText = styled.div`
	font-size: 1.8rem;
	line-height: 2;
	color: #c7c7c7;
`;
