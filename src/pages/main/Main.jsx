import React from 'react';
import styled from 'styled-components';
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
		margin: auto;
		font-size: 2.4rem;
		font-weight: bold;
	}
	h2 {
		margin: 1rem auto;
		font-size: 1.8rem;
		font-weight: normal;
		color: #527080;
	}
`;

const Layout = styled.div`
	width: 60vw;
	height: 100vh;
	margin: 0 auto;
`;
