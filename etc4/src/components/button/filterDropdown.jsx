import React from 'react';
import { useState } from 'react';
import listOpen from '../../assets/listOpen.svg';
import listClose from '../../assets/listClose.svg';
import styled from 'styled-components';

export const FilterDropDown = ({ data, onChange, onSelect, value, width, height, search }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = () => {
		setIsOpen(false);
	};

	return (
		<>
			{search ? (
				<SearchDiv width={width}>
					<SelectInput height={height} className="center" onClick={() => openDropdown()}>
						<SearchInput height={height} value={value} onChange={(e) => onChange(e.target.value)} />
						{isOpen ? (
							<Arrow>
								<img src={listClose} alt="" />
							</Arrow>
						) : (
							<Arrow>
								<img src={listOpen} alt="" />
							</Arrow>
						)}
					</SelectInput>
					<YearDiv>
						{isOpen &&
							data?.map((item) => (
								<Year
									width={width}
									key={item.key}
									select={item.text ? item.text === value : item.name === value}
									onClick={() => {
										onSelect(item);
										closeDropdown(false);
									}}
								>
									{item.name ? item.name : item.text}
								</Year>
							))}
					</YearDiv>
				</SearchDiv>
			) : (
				<PeriodDiv width={width}>
					<SelectButton className="center" onClick={() => openDropdown()}>
						<span>{value}</span>
						{isOpen ? (
							<Arrow>
								<img src={listClose} alt="" />
							</Arrow>
						) : (
							<Arrow>
								<img src={listOpen} alt="" />
							</Arrow>
						)}
					</SelectButton>
					<YearDiv>
						{isOpen &&
							data?.map((item) => (
								<Year
									width={width}
									key={item.key}
									select={item.value ? item.value === value : item.name === value}
									onClick={() => {
										onSelect(item);
										closeDropdown(false);
									}}
								>
									{item.name ? item.name : item.text}
								</Year>
							))}
					</YearDiv>
				</PeriodDiv>
			)}
		</>
	);
};

const PeriodDiv = styled.div`
	width: ${(props) => `${props.width}px`};
	font-size: var(--font-size-14);
	font-family: 'Noto Sans KR', sans-serif;
	height: 100%;
`;

const SearchDiv = styled.div`
	width: ${(props) => `${props.width}px`};
	font-size: var(--font-size-14);
	margin-left: 6px;
	font-family: 'Noto Sans KR', sans-serif;
`;

const Arrow = styled.span`
	padding-left: 13px;
	position: relative;
	bottom: 2px;
`;

const SelectButton = styled.button`
	font-family: 'noto sans KR';
	width: inherit;
	height: inherit;
	border: none;
	border-radius: 5px 0 0 5px;
	border-right: 1px solid #dadce0;
	font-weight: 500;
	background-color: white;
	display: flex;
	justify-content: space-between;
	padding: 15px;
	cursor: pointer;
	span {
		font-weight: 700;
	}
`;

const SelectInput = styled.div`
	width: 100%;
	height: ${(props) => `${props.height}px`};
	border: none;
	border-radius: 5px;
	border: 1px solid #dadce0;
	font-weight: 500;
	background-color: white;
	display: flex;
	justify-content: space-between;
	padding: 15px;
	cursor: pointer;
`;

const SearchInput = styled.input`
	font-family: 'noto sans KR';
	font-size: var(--font-size-14);
	font-weight: 500;
	width: ${(props) => `${100 - props.height / 10}%`};
	height: ${(props) => `${props.height - 2}px`};
	border: none;
	outline: none;
	&::placeholder {
		color: #b4b4b4;
	}
	height: ${(props) => `${props.height - 3}px`};
`;

const YearDiv = styled.div`
	margin-top: 2px;
	position: absolute;
	z-index: 100;
	background-color: white;
	line-height: 31px;
	border-radius: 5px;
	box-shadow: 0px 4px 14px 0px #00000033;
`;

const Year = styled.div`
	width: ${(props) => `${props.width}px`};
	height: 31px;
	padding-left: 12px;
	font-weight: 400;
	&:hover {
		background-color: #f5f5f5;
		cursor: pointer;
	}
	${(props) =>
		props.select
			? `
  background-color: #FDF3EF;
  color: #E16E38;
  `
			: `none`};
`;
