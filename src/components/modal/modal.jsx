import React from 'react';
import styled from 'styled-components';

export const Modal = ({ width, height, children, onClose, open }) => {
	return (
		<ModalWrapper onClick={onClose} open={open}>
			<Frame onClick={(e) => e.stopPropagation()} open={open} width={width} height={height}>
				<Header height={height}>
					<CloseBtn onClick={onClose}>x</CloseBtn>
				</Header>
				<Children height={height}>{children}</Children>
			</Frame>
		</ModalWrapper>
	);
};

//const Overlay = styled.div`
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	width: 100vw;
// 	height: 100vh;
// 	/* pointer-events: none; */
// 	opacity: 1;

// 	will-change: transform, opacity;
// `;

const ModalWrapper = styled.div`
	display: ${(props) => (props.open ? 'block' : 'none')};
	background: rgba(0, 0, 0, 0.7);

	z-index: 200;
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;

const Frame = styled.div`
	z-index: 300;
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	background-color: white;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	border: solid 1px #a1a1a1;
	border-radius: 1px;
	transition: all 0.3s ease-out;
	/* transform: ${(props) => (props.open ? `scale(1) translate(-50%, -50%)` : `scale(0) translate(-50%, -50%)`)}; */
	pointer-events: ${(props) => (props.open ? `all` : `none`)};
`;

const Header = styled.div`
	display: flex;
	justify-content: flex-end;
	height: calc(${(props) => props.height} / 15);
	padding: 5px 10px;
	border-bottom: 1px solid #cccccc;
`;

const CloseBtn = styled.button`
	border: none;
	background-color: white;
	padding: 5px;
	cursor: pointer;
`;

const Children = styled.div`
	padding: 20px;
	height: ${(props) => `calc(100% - ${props.height}/15)`};
`;
