import React from 'react';
import { AppButton } from 'src/components/button/button';
import { ReactComponent as STT } from 'src/assets/STT.svg';

export const Stt = () => {
	return (
		<>
			<AppButton icon={<STT width={45} height={45} />} text={'STT'}></AppButton>
		</>
	);
};
