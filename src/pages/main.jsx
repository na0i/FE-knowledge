import React from 'react';
import RecentPaperList from 'src/components/recentPaperList';
import styled from 'styled-components';

const Wrapper = styled.section`
	margin: 10% 10% 0 10%;
	background-color: #d5e6ff;
	padding: 100px;
`
const Title = styled.section`
	margin: 20px 0px 20px 0px;
`

const MainTitle = styled.div`
	font-size: 30px;
	font-weight: 700;
	margin: 10px 0px 10px 0px;
`

const SubTitle = styled.div`
	font-size: 22px;
	font-weight: 700;
	color: #26497c;
`


const InputBox = styled.div`
	margin-bottom: 20px;
`

const InputText = styled.input`
	font-size: 15px;
	height: 50px;
	width: 90%;
	border: 1px solid #26497c;
	border-radius: 0px;
`

const InputButton = styled.button`
	height: 50px;
	width: 10%;
	border: 1px solid #26497c;
	border-radius: 0px;
`

const Main = () => {
	return (
		<Wrapper>
			<Title>
				<MainTitle>당신을 위한 맞춤형 학술정보서비스</MainTitle>
				<SubTitle>AI로 더 똑똑해진 서비스를 이용해보세요.</SubTitle>
			</Title>
			<InputBox>
				<InputText></InputText>
				<InputButton>검색</InputButton>
			</InputBox>
			<RecentPaperList></RecentPaperList>
		</Wrapper>
	);
};

export default Main;
