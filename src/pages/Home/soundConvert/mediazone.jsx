import React, { useState, useEffect } from 'react';
import { request } from 'src/utils/axios';
import { MediaPlayer } from '../mediaplayer/mediaplayer';
import styled from 'styled-components';

export const MediaZone = ({ file, textData, wordData }) => {
	useEffect(() => {}, []);
	return <MediaPlayer file={file} mediaText={textData} wordData={wordData} />;
};
