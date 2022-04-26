import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { downloadTxt, copyTxt } from 'src/utils/txt';
import { SelectButton } from 'src/components/button/selectButton';
import useInterval from 'src/hooks/useInterval';
import WaveSurfer from 'wavesurfer.js';
import { WordPlayer } from './wordplayer';
import { sec2min } from 'src/utils/time';

export const MediaPlayer = ({ file, mediaText, wordData }) => {
	const [currentTime, setCurrentTime] = useState(0);
	const [currentTimeSec, setCurrentTimeSec] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [audioTime, setAudioTime] = useState('');
	// const [audioSpeed, setAudioSpeed] = useState(1);
	const surfer = useRef(null);

	useEffect(() => {
		surfer.current = WaveSurfer.create({
			barWidth: 1,
			barHeight: 1,
			cursorWidth: 1,
			container: surfer.current,
			backend: 'WebAudio',
			height: 70,
			progressColor: '#cccccc',
			responsive: true,
			waveColor: 'white',
			cursorColor: '#d71b1b',
			closeAudioContext: true,
		});

		if (file) {
			surfer.current.loadBlob(file);
		}

		surfer.current.on('play', () => {
			if (!isLoaded) {
				getAudioDuration();
			}
		});

		setIsLoaded(true);

		let timer = setInterval(getCurrentTime, 200);
		return () => {
			clearInterval(timer);
			surfer.current.destroy();
			surfer.current.pause();
		};
	}, [surfer]);

	const playPause = () => {
		if (!surfer.current.isPlaying()) {
			surfer.current.play();
		} else {
			surfer.current.pause();
		}
	};

	const getCurrentTime = () => {
		setCurrentTime(sec2min(surfer.current.getCurrentTime()));
	};

	const wordPlay = (start, end) => {
		surfer.current.play(start, end);
	};

	// const skipAudio = (sec) => {
	// 	surfer.current.skip(sec);
	// };

	// const speedSelector = () => {
	// 	if (audioSpeed < 4) {
	// 		setAudioSpeed(audioSpeed + 0.5);
	// 		surfer.current.setPlaybackRate(audioSpeed + 0.5);
	// 	} else {
	// 		setAudioSpeed(1);
	// 		surfer.current.setPlaybackRate(1);
	// 	}
	// };

	const getAudioDuration = () => {
		setAudioTime(sec2min(surfer.current.getDuration()));
	};

	useInterval(() => {
		setCurrentTimeSec(surfer.current.getCurrentTime());
	}, 100);

	return (
		<Wrapper>
			<TextBtnPos>
				<SelectButton height={'30px'} text={'시작/정지'} onClick={playPause} />
				<FuncBtnPos>
					<SelectButton height={'30px'} text={`텍스트 복사`} onClick={() => copyTxt(mediaText)} />
					<SelectButton height={'30px'} text={`텍스트 다운로드`} onClick={() => downloadTxt(mediaText)} />
				</FuncBtnPos>
			</TextBtnPos>
			<MediaPos>
				<WaveArea ref={surfer}></WaveArea>
				<TimeStampPos>
					<span>{currentTime}</span>
					<span>{audioTime}</span>
				</TimeStampPos>
				{/* <ButtonPos>
					<div style={{ width: '25%' }}></div>
					<div style={{ width: '45%', display: 'flex', justifyContent: 'space-between' }}>
						<button onClick={() => skipAudio(-10)}>이전</button>

						<button onClick={() => skipAudio(10)}>다음</button>
					</div>
					<div style={{ width: '30%', display: 'flex', justifyContent: 'center' }}>
						<button onClick={speedSelector}>x {audioSpeed}</button>
					</div>
				</ButtonPos> */}
			</MediaPos>
			<TextPos>
				<WordPlayer wordData={wordData} currentTime={currentTimeSec} onClick={wordPlay} />
				{/* <TextHeader>
					<EditBtn onClick={() => setCanEdit(!canEdit)}>편집</EditBtn>
				</TextHeader>
				<Area ref={txtRef} disabled={!canEdit} onChange={(e) => setText(e.target.value)} value={text} /> */}
			</TextPos>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	width: 100%;
`;

const TextBtnPos = styled.div`
	padding: 20px 0;
	height: 60px;
	display: flex;
	justify-content: space-between;
`;

const FuncBtnPos = styled.div`
	width: 190px;
	display: flex;
	justify-content: space-between;
`;

const MediaPos = styled.div`
	border-bottom: 1px solid #e9e9e9;
	height: 100px;
`;

const WaveArea = styled.div`
	align-self: center;
	height: 70px;
	width: 100%;
	background-color: white;
`;

const TimeStampPos = styled.div`
	padding: 0px 10px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	span {
		font-size: 0.875rem;
	}
`;

// const ButtonPos = styled.div`
// 	height: 25px;
// 	margin: 15px 0;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// `;

const TextPos = styled.div`
	height: 280px;
	padding-bottom: 10px;
`;

// const TextHeader = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	width: 100%;
// 	height: 15%;
// 	span {
// 		font-size: 1rem;
// 	}
// `;

// const EditBtn = styled.button`
// 	background-color: white;
// 	border: 1px solid #cccccc;
// 	font-size: 0.875rem;
// 	cursor: pointer;
// 	:hover {
// 		background-color: #f9f9f9;
// 	}
// `;

// const Area = styled.textarea`
// 	resize: none;
// 	padding: 10px;
// 	width: 100%;
// 	height: 75%;
// 	border: 1px solid #cccccc;
// 	overflow: auto;
// `;
