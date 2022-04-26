import React, { useState, useEffect } from 'react';
import { DropZone } from './dropzone';
import { MediaZone } from './mediazone';

export const SoundConvert = () => {
	const [file, setFile] = useState();
	const [isUploaded, setIsUploaded] = useState(false);
	const [textData, setTextData] = useState();
	const [wordData, setWordData] = useState();

	useEffect(() => {
		if (isUploaded) {
		}
	}, [isUploaded]);

	return (
		<>
			{!isUploaded ? (
				<DropZone
					file={file}
					setFile={setFile}
					setIsUploaded={setIsUploaded}
					setTextData={setTextData}
					setWordData={setWordData}
				/>
			) : (
				<MediaZone file={file} textData={textData} wordData={wordData} />
			)}
		</>
	);
};
