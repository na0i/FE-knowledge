import React, { useState } from 'react';
import styled from 'styled-components';
import downIcon from 'src/assets/caretDown.png';

export const SearchDropdown = ({ onChange, value, options }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<SelectorBox>
			<Selector>
				<Input
					onFocus={() => setIsOpen(true)}
					onBlur={() => setIsOpen(false)}
					onChange={onChange}
					value={value}
					placeholder="임시"
				/>
				<SpreadButton onClick={() => setIsOpen(!isOpen)}>
					<img width={16} alt="확장" src={downIcon} />
				</SpreadButton>
			</Selector>
			{isOpen ? (
				<ResultBox>
					{options?.map((option) => (
						<Option key={option.id}>{option.text}</Option>
					))}
				</ResultBox>
			) : (
				<></>
			)}
		</SelectorBox>
	);
};

const SelectorBox = styled.div`
	width: 500px;
	border: 1px solid #3352a4;
	margin: 5px;
`;
const Selector = styled.div`
	padding: 3px;
	display: flex;
	justify-content: space-between;
`;

const Input = styled.input`
	padding: 10px;
	margin: 5px;
	width: 80%;
	border: none;
	:focus {
		outline: none;
	}
`;

const SpreadButton = styled.button`
	width: 20%;
	cursor: pointer;
	border: none;
	background-color: white;
`;

const ResultBox = styled.div`
	z-index: 999;
	position: absolute;
	width: 498px;
	background-color: white;
	padding: 15px;
	border: 1px solid #cccccc;
	border-radius: 0 0 5px 5px;
	display: flex;
	flex-direction: column;
	height: 250px;
`;

const Option = styled.div`
	font-size: 0.875rem;
	padding: 10px;
`;
