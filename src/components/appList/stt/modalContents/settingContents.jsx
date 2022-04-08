import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as MicIcon } from 'src/assets/Mic.svg';
import { ReactComponent as Volume } from 'src/assets/Volume.svg';
import { useMic } from 'src/hooks/useMic';

export const SettingContents = () => {
	const [currentMic, setCurrentMic] = useState();
	const [volume, setVolume] = useState(0);
	const [deviceList, setDeviceList] = useState([]);
	const micRef = useRef();
	const mic = useMic();

	useEffect(() => {
		init();
		if (micRef.current !== undefined) {
			mic.micTest({ setVolume: setVolume });
		}
	}, [micRef]);

	const init = async () => {
		const devices = await mic.getDevices();
		setDeviceList(devices);
	};

	return (
		<SettingWrapper>
			<Content>
				<DropDownTitle>인식 언어</DropDownTitle>
				<DropDown>
					<option value={'ko'}>한국어</option>
					<option value={'en'}>영어</option>
				</DropDown>
			</Content>
			<Content>
				<DropDownTitle>마이크 선택</DropDownTitle>
				<DropDown
					value={currentMic}
					onChange={(e) => {
						console.log(e.target.value);
					}}
				>
					{deviceList?.map((device) => (
						<option value={device.deviceId}>{device.label}</option>
					))}
				</DropDown>
			</Content>

			<div ref={micRef}>
				<MicTestView volume={volume} />
			</div>
			{/* <AudioRecord /> */}
		</SettingWrapper>
	);
};

const SettingWrapper = styled.div`
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Content = styled.div`
	margin-bottom: 20px;
`;

const DropDownTitle = styled.p`
	padding-bottom: 10px;
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

/* ---------------------------------------------- */

const MicTestView = ({ volume }) => {
	return (
		<VolumeWrapper>
			<MicIcon width={25} height={25} />
			<VolumeChecker volume={volume}>
				<TestContents />
				<Volume height={25} width={300} />
			</VolumeChecker>
		</VolumeWrapper>
	);
};

const VolumeWrapper = styled.div`
	width: 30%;
	display: flex;
	justify-content: space-between;
`;

const TestContents = styled.div`
	z-index: -1;
	background-color: #c2c2c2;
	position: absolute;
	width: 300px;
	margin-top: 1px;
	height: 23px;
`;

const VolumeChecker = styled.div.attrs((props) => ({ size: props.volume }))`
	width: 300px;

	::after {
		z-index: -1;
		content: '';
		max-width: 300px;
		width: ${(props) => `${props.volume}%`};
		height: 23px;
		background-color: black;
		display: block;
		position: relative;
		margin: -25px 0;
	}
`;

/*------------------------------------------------------ */
