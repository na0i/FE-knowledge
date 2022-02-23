import React from 'react';
import styled from 'styled-components';
import { Layout } from 'src/components/layout';
import MainSearchBox from './mainSearchBox';

/************************************* jsx *************************************/

const Main = () => {
	return (
		<Layout className="center">
			<Box className="column">
				<h1>당신을 위한 맞춤형 학술정보서비스</h1>
				<h2>AI로 더 똑똑해진 서비스를 이용해보세요</h2>
				<MainSearchBox />
			</Box>
		</Layout>
	);
};

export default Main;

/******************************** styled-components ********************************/

const Box = styled.div`
	padding: 4rem 10rem;
	margin: auto;
	h1 {
		font-size: 2rem;
		font-weight: bold;
	}
	h2 {
		margin: 1rem 0;
		font-size: 1.2rem;
		color: #527080;
	}
	background: #e9f2f9;
`;
