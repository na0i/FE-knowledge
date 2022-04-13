import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BottomLineRadioBtn = ({ options, font, setState }) => {
	const [selected, setSelected] = useState('');

	const changeSelected = (e) => {
		setSelected(e.target.value);
	};

	useEffect(() => {
		options?.forEach((option) => {
			if (option.default) setSelected(option.value);
		});
	}, [options]);

	return (
		<SelectDiv className={font ? `f-${font}` : ''} onChange={changeSelected} value={selected}>
			{options?.map((option, idx) => {
				return (
					<option key={idx} value={option.value}>
						{option.value}
					</option>
				);
			})}
		</SelectDiv>
	);
};

export default BottomLineRadioBtn;

const SelectDiv = styled.select`
	padding: 0.3rem;
	cursor: pointer;
	border-radius: 5px;
	border: 1px solid #aac3ce;
	&:focus {
		outline: none;
	}
	option {
		padding: 10rem;
	}
`;
