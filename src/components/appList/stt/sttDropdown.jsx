import React from 'react';
import { AppButtonDropdown } from 'src/components/dropdown/dropdown';

const sttDropdownContents = [
	{ id: 0, text: '음성 텍스트로 받아쓰기', desc: '음성을 입력하면 자동으로 텍스트로 변환해줘요 :)' },
	{ id: 1, text: '영상 자막 생성하기', desc: '영상 음성을 분석해 ai가 자동으로 자막을 생성해줘요:) ' },
	{ id: 2, text: '음성으로 검색하기', desc: '음성으로 검색하는 기능이 필요한 경우 사용해 보세요:)' },
];

export const SttDropdown = ({ open }) => {
	return (
		<AppButtonDropdown
			open={open}
			width={'220px'}
			height={'90px'}
			children={sttDropdownContents}
		></AppButtonDropdown>
	);
};
