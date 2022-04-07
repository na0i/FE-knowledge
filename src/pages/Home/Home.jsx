import React from 'react';
import styled from 'styled-components';
import { SideBar } from 'src/components/sideBar/sideBar';
import { AppList } from 'src/components/appList/appList';

function Home() {
	return (
		<Wrapper>
			<Title>HyperBrain POC</Title>
			<SideBar appList={AppList} />
		</Wrapper>
	);
}
export default Home;

//styled components 예제
const Wrapper = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.p`
	font-size: 5rem;
`;
