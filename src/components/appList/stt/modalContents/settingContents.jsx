import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as MicIcon } from 'src/assets/Mic.svg';
import { ReactComponent as Volume } from 'src/assets/Volume.svg';

export const SettingContents = () => {
	const [volume, setVolume] = useState(0);
	const micRef = useRef();

	useEffect(() => {
		if (micRef.current !== undefined) {
			micTest({ setVal: setVolume });
		}
	}, [micRef]);
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
				<DropDown>
					<option value={'mic1'}>마이크1</option>
					<option value={'mic2'}>마이크2</option>
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

const micTest = ({ setVal }) => {
	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	if (navigator.mediaDevices) {
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			const analyser = audioCtx.createAnalyser();
			console.log(analyser);
			const micStream = audioCtx.createMediaStreamSource(stream);
			const javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;

			micStream.connect(analyser);
			analyser.connect(javascriptNode);
			javascriptNode.connect(audioCtx.destination);

			javascriptNode.onaudioprocess = () => {
				let array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				let val = 0;
				let avg = 0;
				for (let value of array) {
					val += value;
				}
				avg = val / array.length;
				setVal(avg);
			};
			// const Recorder = new MediaRecorder(stream);
			// Recorder.ondataavailable = (e) => {
			// 	console.log(e.data);
			// };
			// // Recorder.start(100);
			// ref.srcObject = stream;

			// console.log(mediaStreamSrc);
		});
	}
};
