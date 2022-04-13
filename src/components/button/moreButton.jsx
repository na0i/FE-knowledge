import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as MoreBtnIcon } from 'src/assets/moreButtonArrow.svg';

export const MoreButton = () => {
	const [isOpened, setIsOpened] = useState(false);

	const handleMoreButton = () => {
		setIsOpened(!isOpened);
	};

	return (
		<Frame isOpened={isOpened} onClick={handleMoreButton}>
			<Icon isOpened={isOpened}>
				<MoreBtnIcon width="6px" height="10px" />
			</Icon>
			{!isOpened ? <Text>더보기</Text> : <Text>접기</Text>}
		</Frame>
	);
};

const Frame = styled.button`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	border: 1px solid var(--color-gray-button);
	border-radius: 4px;
	background-color: var(--color-white-bg);
	font-size: var(--font-size-12);
	font-weight: 500;
	&:hover {
		border: 1px solid var(--color-gray-button-hover);
	}
	${(props) => (props.isOpened ? `width: 69px;` : `width: 80px;`)}
`;

const Icon = styled.div`
	fill: var(--color-black-text3);
	position: absolute;
	left: 17px;
	${(props) => (props.isOpened ? `transform: rotate( -180deg );` : `none`)}
`;

const Text = styled.span`
	position: absolute;
	right: 14px;
	color: var(--color-black-text3);
	font-size: var(--font-size-12);
`;
