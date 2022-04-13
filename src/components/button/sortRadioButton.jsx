import React, { useState } from 'react';
import styled from 'styled-components';

export const SortRadioButton = ({ sortFatchFunction }) => {
	const [selected, setSelected] = useState('정확도');

	const changeSelect = (sortBy) => {
		setSelected(sortBy);
	};

	return (
		<Select>
			<Option
				selected={selected === '정확도'}
				onClick={() => {
					// sortFatchFunction();
					changeSelect('정확도');
				}}
			>
				정확도
			</Option>
			<Line />
			<Option
				selected={selected === '최신순'}
				onClick={() => {
					// sortFatchFunction();
					changeSelect('최신순');
				}}
			>
				최신순
			</Option>
		</Select>
	);
};

const Select = styled.div`
	font-size: var(--font-size-14);
	font-weight: 400;
	display: flex;
	border: none;
	appearance: none;
`;

const Option = styled.span`
	color: var(--color-black-text2);
	&:hover {
		cursor: pointer;
	}
	${(props) =>
		props.selected
			? `
			font-weight: 700;
			color: var(--color-black-text2);
  	`
			: `none`};
`;

const Line = styled.div`
	display: inline-block;
	width: 1px;
	height: 12px;
	margin: 0 12px;
	background-color: var(--color-gray-button);
`;
