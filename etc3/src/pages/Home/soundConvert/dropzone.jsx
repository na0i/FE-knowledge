import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { request } from 'src/utils/axios';
import useInterval from 'src/hooks/useInterval';
import { ReactComponent as UploadIcon } from 'src/assets/Upload.svg';

export const DropZone = ({ file, setFile, setIsUploaded, setTextData, setWordData }) => {
	const [fileExtension, setFileExtension] = useState('');
	const [nowLoading, setNowLoading] = useState(false);
	const [loadingText, setLoadingText] = useState('변환중');

	const onDrop = useCallback(
		(acceptedFiles) => {
			let fname = acceptedFiles[0]['name'].split('.');
			setFileExtension(fname[fname.length - 1]);
			setFile(acceptedFiles[0]);
		},
		[setFile],
	);

	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		maxFiles: 1,
		accept: 'audio/*',
		// accept: 'audio/wac, audio/aac, audio/m4a, audio/cgg, audio/flac, audio/ac3, audio/opus, audio/mp3',
	});

	const files = acceptedFiles.map((file) => <div key={file.path}>{file.name}</div>);

	const removeFile = () => {
		const noFile = null;
		setFile(noFile);
	};

	const submitFile = () => {
		setNowLoading(true);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			let data = e.target.result;
			sendData(data.split(',')[1]);
		};
	};

	const sendData = async (data) => {
		let extension = fileExtension;
		if (extension === 'wav') extension = 'linear16';
		const res = await request(
			'POST',
			'/v1/asr/recognize',
			JSON.stringify({
				lang: 'kor',
				domain: 'transcribe',
				codec: extension,
				signal: data,
			}),
		);
		let text = '';
		if (res.result) {
			res.result?.forEach((obj) => (text += ` ${obj.word}`));
		}
		setWordData(sentenceMaker(res.result));
		setTextData(text);
		setIsUploaded(true);
	};

	const sentenceMaker = (data) => {
		let test = /(니다)|(고요)|(구요)|(세요)/;
		let arr = [];
		let tempWord = {
			word: '',
			start: data[0].start,
			end: 0,
		};
		data?.forEach((item, idx) => {
			if (idx !== 0 && item.start - tempWord.end > 0.5 && tempWord.word !== '') {
				arr.push(tempWord);
				tempWord = {
					word: '',
					start: item.start,
					end: item.end,
				};
			}
			if (tempWord.start === 0) tempWord.start = item.start;
			tempWord.word += `${item.word} `;
			tempWord.end = item.end;

			if (item.word.match(test)) {
				arr.push(tempWord);
				tempWord = {
					word: '',
					start: 0,
					end: item.end,
				};
			} else if (idx === data.length - 1) {
				arr.push(tempWord);
			}
		});
		return arr;
	};

	useInterval(() => {
		if (loadingText.includes('...')) {
			setLoadingText('변환중');
		} else {
			setLoadingText(loadingText + '.');
		}
	}, 500);

	return (
		<>
			{file ? (
				<Frame>
					<UploadBtn type="button" onClick={open}>
						<UploadIcon width={60} height={60} />
					</UploadBtn>
					<MainDesc>{files}</MainDesc>

					<BtnBox nowLoading={nowLoading}>
						{nowLoading ? (
							<div>{loadingText}</div>
						) : (
							<>
								<ConvertBtn onClick={() => submitFile()}>변환하기</ConvertBtn>
								<ConvertBtn onClick={removeFile}>업로드 취소</ConvertBtn>
							</>
						)}
					</BtnBox>
				</Frame>
			) : (
				<Frame {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<UploadBtn type="button" onClick={open}>
						<UploadIcon width={60} height={60} />
					</UploadBtn>
					<MainDesc>음성파일을 첨부하거나 끌어오세요</MainDesc>
					<SubDesc>음성 파일 크기에 비례하여 시간이 걸립니다.</SubDesc>
					<SubDesc>지원 파일: wav, aac, m4a, cgg, flac, ac3, opus, mp3</SubDesc>
					{/* <UploadBtn >
						파일 선택
					</UploadBtn> */}
				</Frame>
			)}
		</>
	);
};

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MainDesc = styled.div`
	font-size: 1.1rem;
	font-weight: 700;
	padding: 1rem 0;
`;

const SubDesc = styled.div`
	color: #9c9c9c;
	line-height: 1.5;
	font-size: 15px;
`;

const UploadBtn = styled.button`
	border: none;
	cursor: pointer;
	background-color: white;
	border-radius: 50%;
	:hover {
		background-color: #f9f9f9;
	}
`;

const BtnBox = styled.div`
	display: flex;
	width: 200px;
	justify-content: ${(props) => (props.nowLoading ? 'center' : 'space-between')};
	align-items: center;
	text-align: center;
`;

const ConvertBtn = styled.button`
	font-size: 1rem;
	border: 1px solid #0f1a83;
	border-radius: 5px;
	background-color: white;
`;
