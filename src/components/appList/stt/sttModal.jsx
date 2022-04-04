import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from 'src/components/modal/modal';
import { SttModalContents } from './modalContents/sttModalContents';

export const SttModal = ({ open, onClose }) => {
	// const [isOpenModal, setIsOpenModal] = useState(false);
	const wrapperRef = useRef();
	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const handleClickOutside = (e) => {
		if (wrapperRef && !wrapperRef.current.contains(e.target)) {
			open = false;
		} else {
			open = true;
		}
		console.log(open);
	};

	return (
		open && (
			<ModalWrapper ref={wrapperRef}>
				<Modal
					open={open}
					onClose={onClose}
					width={'1200px'}
					height={'80vh'}
					children={<SttModalContents onClose={onClose} />}
				></Modal>
			</ModalWrapper>
		)
	);
};

const ModalWrapper = styled.div``;
