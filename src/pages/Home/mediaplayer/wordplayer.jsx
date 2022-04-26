import React, { useRef, useEffect, createRef } from 'react';
import { sec2min } from 'src/utils/time';
import styled from 'styled-components';

const WordBox = ({ wordObj, onClick, current }) => {
	const ref = useRef();

	useEffect(() => {
		if (current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
	}, [current]);

	return (
		<Box ref={ref} current={current} onClick={() => onClick(wordObj.start, wordObj.end)}>
			<Time>{sec2min(wordObj.start)}</Time>
			<Text>{wordObj.word}</Text>
		</Box>
	);
};

const Box = styled.div`
	cursor: pointer;

	display: flex;
	justify-content: flex-start;
	margin-top: 15px;
	font-weight: ${(props) => (props.current ? '700' : '')};
	color: ${(props) => (props.current ? '#0f1a83' : '')};
`;

const Time = styled.div`
	width: 3rem;
	font-weight: normal;
	color: black;
`;

const Text = styled.span`
	width: 90%;
`;

export const WordPlayer = ({ wordData, onClick, currentTime }) => {
	return (
		<ContentsBox>
			{wordData?.map((word) => (
				<WordBox
					key={word.start}
					onClick={onClick}
					wordObj={word}
					current={currentTime > word.start && currentTime < word.end}
				/>
			))}
		</ContentsBox>
	);
};

const ContentsBox = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: 100%;
	::-webkit-scrollbar {
		width: 10px;
		background-color: white;
	}
	::-webkit-scrollbar-thumb {
		background-color: #cccccc;
		border-radius: 1rem;
	}
	padding: 1rem;
`;
