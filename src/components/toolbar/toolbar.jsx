import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

export const Toolbar = ({ width, height, children, onClose, open }) => {
	return (
		<Draggable defaultPosition={{ x: -150, y: 0 }} handle=".handler">
			<Frame open={open} width={width} height={height}>
				<ButtonWrapper>
					<DragHandler className="handler">...</DragHandler>
					<CloseBtn onClick={onClose}>x</CloseBtn>
				</ButtonWrapper>
				<Children height={height}>{children}</Children>
			</Frame>
		</Draggable>
	);
};

const Frame = styled.div`
	opacity: ${(props) => (props.open ? 1 : 0)};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	z-index: 200;
	position: fixed;
	top: 50%;
	left: 50%;
	background-color: white;
	border: solid 1px #a1a1a1;
	border-radius: 1px;
	transform: translate(-50%, -50%);
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: 0px;
`;

const DragHandler = styled.button`
	border: none;
	background-color: transparent;
	margin: auto;
	padding: 0px 0px 0px 10%;
	cursor: pointer;
`;

const CloseBtn = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
`;

const Children = styled.div`
	margin: 10px auto;
`;
