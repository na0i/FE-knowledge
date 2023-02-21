import React from 'react';
import styled from 'styled-components';

export const SortRadioButton = ({ sortOptions, setSortOptions }) => {
	const changeSelect = (id) => {
		let sortOptionsTemp = sortOptions;
		sortOptionsTemp.forEach((option) => {
			if (option.id === id) option.selected = true;
			else option.selected = false;
		});
		setSortOptions([...sortOptionsTemp]);
	};

	return (
		<Select>
			{sortOptions?.map((option) => {
				return (
					<div key={option.id}>
						<Option select={option.selected} onClick={() => changeSelect(option.id)}>
							{option.name}
						</Option>
						{option.id < sortOptions.length ? <Line /> : <></>}
					</div>
				);
			})}
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
	font-weight: ${(props) => (props.select ? 'bold' : 'normal')};
`;

const Line = styled.div`
	display: inline-block;
	width: 1px;
	height: 12px;
	margin: 0 12px;
	background-color: var(--color-gray-button);
`;
