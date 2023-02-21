import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useMic } from 'src/hooks/useMic';
import { ReactComponent as RecordMic } from 'src/assets/RecordMic.svg';

export const RealTimeVoiceConvert = () => {
	const mic = useMic();
	const startRef = useRef();
	const stopRef = useRef();

	useEffect(() => {
		mic.record(startRef, stopRef);
	}, []);

	return (
		<Frame>
			<BtnWrapper onClick={() => mic.record2()}>
				<RecordMic ref={startRef} />
				<button ref={stopRef}>중지</button>
			</BtnWrapper>
			<Desc>음성을 입력하면 자동으로 텍스트로 변환해줘요.</Desc>
		</Frame>
	);
};

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
`;

const BtnWrapper = styled.div`
	position: relative;
	top: 0;
	width: 60px;
	height: 60px;
	margin-bottom: 40px;
`;

const Desc = styled.div`
	font-size: 20;
	font-weight: 500;
`;
