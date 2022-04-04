import React, { useState } from 'react';
import { AppButton } from 'src/components/button/button';
import { ReactComponent as STT } from 'src/assets/STT.svg';
import { SttDropdown } from './sttDropdown';

export const Stt = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{/* <AppButton icon={<STT width={45} height={45} />} text={'STT'} onClick={openDropdown}></AppButton> */}
			<AppButton icon={<STT width={45} height={45} />} text={'STT'}></AppButton>
			{/* <SttDropdown open={isOpen}></SttDropdown> */}
		</>
	);
};
