import React, { useState } from 'react';
import { SelectButton } from 'src/components/button/selectButton';
import styled from 'styled-components';

export const OptionSelector = ({ data, onClick }) => {
	return (
		<SelectorForm>
			{data?.map((item, idx) => (
				<SelectButton
					key={idx}
					text={item.text}
					width={'30%'}
					height={'40px'}
					selected={item.selected}
					onClick={() => onClick(idx)}
				/>
			))}
		</SelectorForm>
	);
};

const SelectorForm = styled.div`
	width: 650px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;
`;
