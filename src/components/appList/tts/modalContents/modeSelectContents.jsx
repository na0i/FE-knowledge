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

	const selectMode = (optionId) => {
		let newModeId = optionId;
		console.log(newModeId);
		setModeId(newModeId);
	};

	return (
		<Frame>
			<Title>텍스트 음성 변환</Title>
			<SubTitle>Text - to - Speech</SubTitle>
			<Desc>보이스를 선택해 내가 원하는 대로 음성으로 만들 수 있습니다.</Desc>
			<div>
				<ModeTitle>Mode</ModeTitle>
				{options.map((option) => (
					<Option key={option.id}>
						<OptionSelectBtn defaultChecked={modeId === option.id} onClick={() => selectMode(option.id)} />
						<BtnLabel></BtnLabel>

						<OptionName>
							{option.icon} {option.optionName}
						</OptionName>
						<OptionDesc>{option.optionDesc}</OptionDesc>
					</Option>
				))}
			</div>
			<NextBtn>다음</NextBtn>
		</Frame>
	);
};

const Frame = styled.div`
	padding: 20px;
`;

const Title = styled.span`
	font-size: 35px;
	font-weight: 500;
`;

const SubTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
	margin-left: 20px;
	color: #424242;
`;

const Desc = styled.div`
	margin: 20px 0px;
	font-size: 18px;
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
`;

const BtnLabel = styled.label`
	position: absolute;
	height: 20px;
	width: 20px;
	display: block;
	border-radius: 100%;
	background: transparent;
	/* border: 15px solid #000000; */
`;

const OptionSelectBtn = styled.input`
	z-index: 1;
	display: block;
	justify-content: center;
	height: 20px;
	width: 20px;
	border-radius: 100%;
	&:defaultchecked + ${BtnLabel} {
		background-color: #000000;
		border: 15px solid #000000;
	}
	&:hover {
		cursor: pointer;
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

const NextBtn = styled.button`
	position: absolute;
	width: 200px;
	height: 50px;
	font-size: 17px;
	border: 1px solid #a0a0a0;
	border-radius: 5px;
	left: 500px;
	bottom: 50px;
	background-color: #a0a0a0;
	color: white;
	&:hover {
		cursor: pointer;
	}
`;
