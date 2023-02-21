import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { OptionSelector } from './optionsSelector';
import { SoundConvert } from './soundConvert/soundConvert';
import { Header } from 'src/components/header/header';
import { SubInfo } from './subInfo';
import { RealTimeVoiceConvert } from './realTimeVoiceConvert/realTimeVoiceConvert';

const Home = () => {
	const [currentComp, setCurrentComp] = useState(null);
	const [compList, setCompList] = useState([
		{
			text: '실시간 음성 변환하기',
			subText: '마이크로부터 실시간으로 음성을 입력받아 텍스트로 변환해주는 기술',
			selected: true,
			component: <RealTimeVoiceConvert />,
		},
		{
			text: '음성 파일 변환하기',
			subText: '녹음된 음성파일을 입력받아 텍스트로 변환해주는 기술',
			selected: true,
			component: <SoundConvert />,
		},
		{
			text: '영상 자막 생성하기',
			subText: '업로드한 영상의 음성을 분석하여 자동으로 자막을 생성해주는 기술',
			selected: false,
			component: <div>3</div>,
		},
	]);

	useEffect(() => {
		setCurrentComp(compList[1]);
	}, []);

	const handleOption = (idx) => {
		let arr = [...compList];
		arr.forEach((item, index) => (index === idx ? (item.selected = true) : (item.selected = false)));
		setCompList(arr);
		setCurrentComp(arr[idx]);
	};

	return (
		<Wrapper>
			<Header />
			<OptionSelector data={compList} onClick={handleOption} />
			{currentComp ? (
				<>
					<SubInfo text={currentComp.subText} />
					<ContentsBox>{currentComp.component}</ContentsBox>
				</>
			) : (
				<></>
			)}
		</Wrapper>
	);
};
export default Home;

//styled components 예제
const Wrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ContentsBox = styled.div`
	width: 800px;
	height: 460px;
	border: 1px solid #0f1a83;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
