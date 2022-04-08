import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { appStore } from 'src/stores/appStore';
import { SttToolbar } from '../appList/stt/sttToolbar';

export const AppButtonDropdown = observer(({ width, height, children, appName }) => {
	const [isToolbarOpen, setIsToolbarOpen] = useState(false);
	const [menuId, setMenuId] = useState(99);
	const openToolbar = (menuId) => {
		setIsToolbarOpen(!isToolbarOpen);
		setMenuId(menuId);
	};

	const closeToolbar = () => {
		setIsToolbarOpen(false);
	};
	return (
		<>
			<Frame open={appName === appStore.openAppName} width={width} height={height}>
				{children.map((menu) => (
					<Menu key={menu.id}>
						<Icon>{menu.icon}</Icon>
						<MenuText onClick={() => openToolbar(menu.id)}>{menu.text}</MenuText>
						<Tooltip>{menu.desc}</Tooltip>
					</Menu>
				))}
			</Frame>
			{menuId === 0 ? <SttToolbar open={isToolbarOpen} onClose={closeToolbar} /> : <></>}
		</>
	);
});

const Frame = styled.div`
	z-index: 300;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: ${(props) => props.width};
	/* height: ${(props) => props.height}; */
	background-color: white;
	position: absolute;
	transform: translate(-50%, -50%);
	border: solid 2px #000000;
	border-radius: 2px;
	transition: all 0.1s ease-out;
	opacity: ${(props) => (props.open ? 1 : 0)};
	/* transform: ${(props) => (props.open ? `scale(1) translate(-50%, -50%)` : `scale(0) translate(-50%, -50%)`)}; */
	top: 52px;
	right: -30px;
	pointer-events: ${(props) => (props.open ? `all` : `none`)};
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
	}
`;

const Menu = styled.div`
	display: flex;
	align-items: center;
	margin: 1px;
	padding: 3px 0px;
	position: relative;
	&:hover {
		background-color: #e6e6e6;
	}
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
`;

const Icon = styled.button`
	display: flex;
	border: transparent;
	background-color: transparent;
	align-items: center;
`;
