import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as History } from 'src/assets/History.svg';
import { SettingContents } from './settingContents';
import { UploadContents } from './uploadContents';
import { appStore } from 'src/stores/appStore';

export const SttModalContents = ({ onClose }) => {
	const options = [
		{ id: 0, text: '설정', contents: <SettingContents /> },
		{ id: 1, text: '파일업로드', contents: <UploadContents /> },
	];
	const [currentOption, setCurrentOption] = useState(0);
	const [currentContents, setCurrentContents] = useState(<SettingContents />);

	const selectContents = (option) => {
		setCurrentOption(option.id);
		setCurrentContents(option.contents);
	};

	if (!appStore.isSttSettingModalOn) return null;

	return (
		<ContentsWrapper>
			<Header>
				<h1>음성 받아쓰기</h1>
				<span>Speech - to - text system :Dictation</span>
				<p>
					사람이 말하는 음성 언어를 컴퓨터가 해석해 그 내용을 텍스트로 변환해주는 음성 - 문자 변환
					시스템입니다.
				</p>
			</Header>
			<Body>
				<BodyHeader>
					<Selector>
						{options?.map((option) => (
							<Option
								id={option.id}
								current={currentOption}
								key={option.id}
								onClick={() => selectContents(option)}
							>
								{option.text}
							</Option>
						))}
					</Selector>
					<RecordButton>
						<History width={25} height={25} />
					</RecordButton>
				</BodyHeader>
				<OptionSelectLine current={currentOption} />
				<BodyContents>{currentContents}</BodyContents>
			</Body>
			<Footer>
				<CloseButton onClick={onClose}>닫기</CloseButton>
				<SaveButton>저장</SaveButton>
			</Footer>
		</ContentsWrapper>
	);
};

const ContentsWrapper = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const Header = styled.div`
	height: 35%;

	h1 {
		font-size: 2rem;
		display: inline-block;
		margin-right: 10px;
	}

	span {
		color: #6b6b6b;
	}

	p {
		padding-top: 25px;
		font-weight: bold;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	height: 65%;
`;

const BodyHeader = styled.div`
	display: flex;
	justify-content: space-between;
	height: 10%;
	margin-bottom: 5px;
`;

const Selector = styled.div`
	display: flex;
	width: 95%;
`;

const Option = styled.div`
	align-self: center;
	width: 10%;
	text-align: center;
	cursor: pointer;
	font-weight: bold;
	color: ${(props) => (props.current === props.id ? `black` : `#cccccc`)};
`;

const OptionSelectLine = styled.div`
	margin: 0 auto;
	height: 4px;
	background-color: #cccccc;
	width: 100%;

	${(props) => {
		const trans = props.current * 100;
		return `::after {
			position:relative;
			transition-duration: 0.3s;
			transform: translateX(${trans}%);
			content: '';
			display: block;
			width: 9.5%;
			border-bottom: 4px solid black;
	}`;
	}}
`;

const RecordButton = styled.button`
	border: none;
	background-color: white;
	cursor: pointer;
	width: 5%;
	:hover {
		fill: #757575;
	}
`;

const BodyContents = styled.div`
	height: 95%;
	/* border-top: 5px solid #cccccc; */
`;

const Footer = styled.div`
	text-align: center;
`;

const CloseButton = styled.button`
	border: 1px solid #cccccc;
	border-radius: 5px;
	padding: 10px 50px;
	background-color: white;
	cursor: pointer;
	color: #363636;
	transition-duration: 0.2s;
	margin-right: 20px;
	:hover {
		color: #696969;
		background-color: #b3b3b3;
	}
`;

const SaveButton = styled.button`
	border: 1px solid #cccccc;
	border-radius: 5px;
	padding: 10px 50px;
	color: white;
	cursor: pointer;
	background-color: #5e5e5e;
	transition-duration: 0.2s;
	:hover {
		color: #bebebe;
		background-color: #9c9c9c;
	}
`;
