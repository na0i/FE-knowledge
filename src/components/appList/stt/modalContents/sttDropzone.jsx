import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as UploadIcon } from 'src/assets/Toolbar-upload.svg';

export const SttDropzone = () => {
	const [file, setFile] = useState('');
	const onDrop = useCallback((acceptedFiles) => {
		setFile(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		maxFiles: 1,
		accept: 'audio/*',
		// accept: 'audio/wac, audio/aac, audio/m4a, audio/cgg, audio/flac, audio/ac3, audio/opus, audio/mp3',
	});

	const files = acceptedFiles.map((file) => <div key={file.path}>{file.name}</div>);

	// console.log(file);
	const removeFile = () => {
		const noFile = null;
		setFile(noFile);
	};

	return (
		<>
			{file ? (
				<Frame>
					<UploadIcon width={30} height={30} />
					<MainDesc>{files}</MainDesc>
					<UploadBtn onClick={removeFile}>업로드 취소</UploadBtn>
				</Frame>
			) : (
				<Frame {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<UploadIcon width={30} height={30} />
					<MainDesc>음성파일을 첨부하거나 끌어오세요.</MainDesc>
					<SubDesc>지원 파일: wav, aac, m4a, cgg, flac, ac3, opus, mp3</SubDesc>
					<UploadBtn type="button" onClick={open}>
						파일 선택
					</UploadBtn>
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
	font-size: 18px;
	margin-top: 10px;
`;

const SubDesc = styled.div`
	color: #9c9c9c;
	font-size: 15px;
`;

const UploadBtn = styled.button`
	margin-top: 20px;
`;
