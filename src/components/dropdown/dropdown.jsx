import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SttModal } from '../appList/stt/sttModal';

export const AppButtonDropdown = ({ width, height, children, open }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		open = !open;
		console.log(open);
	};

	const onClose = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {}, [open]);

	return (
		<>
			{open && (
				<>
					<Frame open={open} width={width} height={height}>
						{children.map((menu) => (
							<Menu key={menu.id} onClick={openModal}>
								{menu.text}
							</Menu>
						))}
					</Frame>
					{/* {menuIdx === 0 ? <SttModal open={isModalOpen} onClose={onClose} /> : <></>} */}
					<SttModal open={isModalOpen} onClose={onClose} />
				</>
			)}
		</>
	);
};

const Frame = styled.div`
	z-index: 300;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	background-color: white;
	position: absolute;
	transform: translate(-50%, -50%);
	border: solid 2px #000000;
	border-radius: 2px;
	transition: all 0.1s ease-out;
	/* opacity: ${(props) => (props.open ? 1 : 0)}; */
	top: 65px;
	right: 40px;
	/* transform: ${(props) => (props.open ? `scale(1) translate(-50%, -50%)` : `scale(0) translate(-50%, -50%)`)}; */
	/* pointer-events: ${(props) => (props.open ? `all` : `none`)}; */
`;

const Menu = styled.div`
	padding: 5px;
	font-size: 1rem;
	font-weight: 500;
	height: ${(props) => `calc(100% - ${props.height}/15)`};
	&:hover {
		background-color: #e6e6e6;
	}
	cursor: pointer;
`;
