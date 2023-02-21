import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Zoom } from 'src/assets/zoom.svg';

export const SearchButton = ({ height, onClick, inputfocus }) => {
	return (
		<Search height={height} onClick={onClick}>
			<Zoom inputfocus={inputfocus} width={`20`} height={`20`} />
		</Search>
	);
};

const Search = styled.button`
	display: flex;
	width: ${(props) => `${props.height + 10}px`};
	height: ${(props) => `${props.height}px`};
	align-items: center;
	border-radius: ${(props) => (props.inputFocus ? `0 3px 0 0` : `0 3px 3px 0`)};
	justify-content: center;
	border: none;
	cursor: pointer;
	background: var(--color-orange-point);
	&:focus {
		outline: none;
	}
	&:hover {
		svg {
			path {
				fill: #f5f5f5;
			}
		}
	}
`;
