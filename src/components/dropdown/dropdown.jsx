import React, { useState } from 'react';
import styled from 'styled-components';
import { SttModal } from '../appList/stt/sttModal';

export const AppButtonDropdown = ({ width, height, children, open }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [menuId, setMenuId] = useState(99);

	const openModal = (menuId) => {
		setIsModalOpen(true);
		setMenuId(menuId);
	};

	const onClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{open && (
				<>
					<Frame open={open} width={width} height={height}>
						{children.map((menu) => (
							<Menu key={menu.id}>
								<Icon>{menu.icon}</Icon>
								<MenuText onClick={() => openModal(menu.id)}>{menu.text}</MenuText>
								<Tooltip>{menu.desc}</Tooltip>
							</Menu>
						))}
					</Frame>
					{menuId === 0 ? <SttModal open={isModalOpen} onClose={onClose} /> : <></>}
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

const Tooltip = styled.span`
	display: none;
	position: absolute;
	padding: 20px;
	top: 0px;
	right: 240px;
	width: 220px;
	/* height: 50px; */
	background-color: #414141;
	border-radius: 3px;
	color: white;
	font-size: 13px;
	line-height: 130%;
	&::after {
		border-top: 5px solid transparent;
		border-left: 10px solid #414141;
		border-right: 5px solid transparent;
		border-bottom: 5px solid transparent;
		content: '';
		position: absolute;
		top: 5px;
		right: -10px;
		/* left: -10px; */
	}
`;

const Menu = styled.div`
	display: flex;
	padding: 1px 0px 1px 0px;
	position: relative;
	&:hover ${Tooltip} {
		display: block;
	}
`;

const MenuText = styled.span`
	/* padding: 2px 5px 5px 2px; */
	font-size: 16px;
	font-weight: 500;
	height: ${(props) => `calc(100% - ${props.height}/15)`};
	cursor: pointer;
	&:hover {
		background-color: #e6e6e6;
	}
`;

const Icon = styled.button`
	/* display: flex; */
	border: transparent;
	background-color: white;
`;
