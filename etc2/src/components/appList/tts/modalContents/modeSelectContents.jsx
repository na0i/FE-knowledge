import React from 'react';
import styled from 'styled-components';
import { ReactComponent as WriteIcon } from 'src/assets/TTS-write.svg';
import { ReactComponent as SelectIcon } from 'src/assets/TTS-select.svg';
import { useState } from 'react';

export const ModeSelectContents = () => {
	const [modeId, setModeId] = useState('');

	const options = [
		{
			id: 0,
			icon: <WriteIcon width={20} height={20} />,
			optionName: '직접 작성 [크게 보기]',
			optionDesc: '텍스트를 직접 타이핑하여 작성하거나 텍스트 파일을 업로드합니다.',
		},
		{
			id: 1,
			icon: <SelectIcon width={20} height={20} />,
			optionName: '텍스트 선택 (툴바 모드)',
			optionDesc: '스튜디오에서 음성으로 읽어주기를 원하는 텍스트를 선택합니다.',
		},
	];

	const selectMode = (event) => {
		let newModeId = parseInt(event.target.value);
		setModeId(newModeId);
	};

	return (
		<Frame>
			<Header>
				<h1>텍스트 음성 변환</h1>
				<span>Text - to - Speech</span>
				<p>보이스를 선택해 내가 원하는 대로 음성으로 만들 수 있습니다.</p>
			</Header>
			<Body>
				<ModeTitle>Mode</ModeTitle>
				{options.map((option) => (
					<Option key={option.id}>
						<OptionSelectBtn
							type="radio"
							value={option.id}
							checked={modeId === option.id}
							onChange={(event) => selectMode(event)}
						/>
						<BtnLabel />
						<OptionName>
							{option.icon} {option.optionName}
						</OptionName>
						<OptionDesc>{option.optionDesc}</OptionDesc>
					</Option>
				))}
			</Body>
			<Footer>
				<NextBtn>다음</NextBtn>
			</Footer>
		</Frame>
	);
};

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px;
`;

const Header = styled.div`
	height: 15%;

	h1 {
		font-size: 2.2rem;
		display: inline-block;
		margin-right: 20px;
	}

	span {
		font-size: 1.2rem;
		font-weight: 200;
		color: #6b6b6b;
	}

	p {
		font-size: 1.2rem;
		font-weight: 400;
		padding-top: 25px;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 50px;
	height: 75%;
`;

const ModeTitle = styled.div`
	border-bottom: 4px solid black;
	font-size: 23px;
	font-weight: 600;
	padding-bottom: 10px;
	margin-top: 60px;
`;

const Option = styled.div`
	border-bottom: 1px solid black;
	padding: 60px 0px;
	display: flex;
	align-items: center;
	height: 45%;
`;

const BtnLabel = styled.label`
	position: absolute;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: white;
	border: 1px solid #bebebe;
`;

const OptionSelectBtn = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 50%;
	margin-right: 10px;
	&:hover ~ ${BtnLabel} {
		background: #bebebe;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 12px;
			height: 12px;
			margin: 5px;
			background: #ffffff;
		}
	}
	&:checked + ${BtnLabel} {
		background: #000000;
		border: 1px solid #000000;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 12px;
			height: 12px;
			margin: 5px;
			box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
			background: white;
		}
	}
`;

const OptionName = styled.div`
	display: inline-block;
	width: 30%;
	padding: 0px 40px;
	font-size: 20px;
	font-weight: 600;
`;
const OptionDesc = styled.div`
	display: inline-block;
	width: 50%;
	font-size: 20px;
	color: #424242;
`;

const Footer = styled.div`
	text-align: center;
	height: 10%;
`;

const NextBtn = styled.button`
	position: absolute;
	width: 200px;
	height: 50px;
	font-size: 17px;
	border: 1px solid #a0a0a0;
	border-radius: 5px;
	left: 500px;
	background-color: #a0a0a0;
	color: white;
	&:hover {
		cursor: pointer;
	}
`;
