import React from 'react';
import styled from 'styled-components';

export const SettingContents = () => {
	return (
		<div>
			<DropDownTitle>인식 언어</DropDownTitle>
			<DropDown>
				<option value={'ko'}>한국어</option>
				<option value={'en'}>영어</option>
			</DropDown>
			<DropDownTitle>마이크 선택</DropDownTitle>
			<DropDown>
				<option value={'mic1'}>마이크1</option>
				<option value={'mic2'}>마이크2</option>
			</DropDown>
			{/* <AudioRecord /> */}
		</div>
	);
};

const DropDownTitle = styled.p`
	padding: 15px 0 10px 0;
	color: #474747;
	font-weight: bold;
`;

const DropDown = styled.select`
	border-radius: 5px;
	height: 30px;
	width: 30%;
	:focus {
		outline: none;
	}
`;
