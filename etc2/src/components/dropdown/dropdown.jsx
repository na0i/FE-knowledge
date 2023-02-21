import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { appStore } from 'src/stores/appStore';

export const AppButtonDropdown = observer(({ open, onClose, width, height, children, appName }) => {
	return (
		<>
			<DropdownWrapper onClick={onClose} open={appName === appStore.openAppName && open}></DropdownWrapper>
			<Frame
				onClick={() => appStore.handleDropdown('')}
				open={appName === appStore.openAppName && open}
				width={width}
				height={height}
			>
				{children.map((menu) => (
					<Menu key={menu.id}>
						<Icon>{menu.icon}</Icon>
						<MenuText onClick={() => appStore.openMenu(appName, menu.id)}>{menu.text}</MenuText>
						<Tooltip>{menu.desc}</Tooltip>
					</Menu>
				))}
			</Frame>
		</>
	);
});

const DropdownWrapper = styled.div`
	display: ${(props) => (props.open ? 'block' : 'none')};
	z-index: 100;
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	/* background-color: aliceblue; */
`;

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
	top: 55px;
	right: -20px;
	/* transform: ${(props) => (props.open ? `scale(1) translate(-50%, -50%)` : `scale(0) translate(-50%, -50%)`)}; */
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
	cursor: pointer;
	&:hover {
		background-color: #e6e6e6;
	}
	&:hover ${Tooltip} {
		display: block;
	}
`;

const MenuText = styled.span`
	font-size: 16px;
	font-weight: 500;
	height: ${(props) => `calc(100% - ${props.height}/15)`};
`;

const Icon = styled.button`
	display: flex;
	border: transparent;
	background-color: transparent;
	align-items: center;
	cursor: pointer;
`;
