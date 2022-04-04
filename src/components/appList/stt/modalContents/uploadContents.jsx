import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Upload } from 'src/assets/Upload.svg';
import { SttDropzone } from './sttDropzone';

export const UploadContents = () => {
	// const [currentFile, setCurrentFile] = useState({ name: '' });

	// const uploadFile = (e) => {
	// 	const reg = /.+\.(wav|aac|m4a|ogg|flac|ac3|opus|mp3)/;
	// 	const file = e.target.files[0];
	// 	if (reg.test(file.name)) {
	// 		setCurrentFile(file);
	// 	} else {
	// 		alert('못올리는 파일이어라');
	// 	}
	// };

	return (
		// <UploadBox>
		// 	<div>
		// 		<Upload width={35} height={35} />
		// 	</div>
		// 	<p>음성파일을 첨부하거나 끌어오세요.</p>
		// 	<span>지원파일: wav, aac, m4a, ogg, flac, ac3, opus, mp3</span>
		// 	<input
		// 		id="fileUpload"
		// 		style={{ display: 'none' }}
		// 		type="file"
		// 		accept="audio/*"
		// 		multiple={false}
		// 		onChange={uploadFile}
		// 	/>
		// 	<UploadLabel htmlFor="fileUpload">파일 선택</UploadLabel>
		// </UploadBox>
		<UploadBox>
			<div>
				<SttDropzone></SttDropzone>
			</div>
		</UploadBox>
	);
};

const UploadBox = styled.div`
	border: 1px solid #a3a3a3;
	border-radius: 5px;
	width: 100%;
	height: 90%;
	line-height: 2;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	p {
		font-size: 1.15rem;
		font-weight: 500;
	}
	span {
		font-size: 0.875rem;
		color: #9e9e9e;
	}

	input {
		text-align-last: center;
		margin: 10px;
	}
`;

const UploadLabel = styled.label`
	border: 1px solid #cccccc;
	background-color: #f0f0f0;
	border-radius: 5px;
	margin: 5px 10px;
	font-size: 0.875rem;
	padding: 0 10px;
	:hover {
		background-color: #f8f8f8;
	}
`;
