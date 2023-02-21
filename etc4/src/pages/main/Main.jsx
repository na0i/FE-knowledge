import React from 'react';
import styled from 'styled-components';
import MainSearchBox from './mainSearchBox';
import { ReactComponent as Logo } from 'src/assets/logo.svg';

/************************************* jsx *************************************/

const Main = () => {
	return (
		<Layout className="center">
			<Box className="column center">
				<Logo />
				<Text>맞춤형 학술정보서비스</Text>
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
		font-size: 32px;
		font-weight: bold;
		line-height: 46px;
	}
	h2 {
		margin: 2px auto;
		font-size: 18px;
		line-height: 26px;
		font-weight: normal;
		color: var(--color-black-text3);
	}
`;

const Text = styled.div`
	font-size: 15px;
	line-height: 22px;
	color: #fe7c0b;
	font-weight: bold;
	margin-bottom: 2rem;
`;
const Layout = styled.div`
	width: 60vw;
	height: 100vh;
	margin: 0 auto;
`;
