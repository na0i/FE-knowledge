import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Upload } from 'src/assets/Upload.svg';
import { SttDropzone } from './sttDropzone';

export const UploadContents = () => {
	return (
		<UploadBox>
			{/* <div>
				<Upload width={35} height={35} />
			</div>
			<p>음성파일을 첨부하거나 끌어오세요.</p>
			<span>지원파일: wav, aac, m4a, ogg, flac, ac3, opus, mp3</span>
			<input type="file" /> */}
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
		font-size: 1.1rem;
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
