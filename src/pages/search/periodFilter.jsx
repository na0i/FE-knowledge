import React from 'react';
import { useState } from 'react';
import listOpen from '../../assets/listOpen.svg';
import listClose from '../../assets/listClose.svg';
import styled from 'styled-components';

const PeriodFilter = ({ years, selectedYearName, selectedYearValue, onSelectedYear }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = () => {
		setIsOpen(false);
	};

	return (
		<PeriodDiv>
			<SelectButton className="center" onClick={() => openDropdown()}>
				<span>{selectedYearName}</span>
				{isOpen && (
					<Arrow>
						<img src={listClose} alt="" />
					</Arrow>
				)}
				{!isOpen && (
					<Arrow>
						<img src={listOpen} alt="" />
					</Arrow>
				)}
			</SelectButton>
			<YearDiv>
				{isOpen &&
					years.map((year) => (
						<Year
							key={year.id}
							select={year.name === selectedYearName}
							onClick={() => {
								onSelectedYear(year);
								closeDropdown(false);
							}}
						>
							{year.name}
						</Year>
					))}
			</YearDiv>
		</PeriodDiv>
	);
};

export default PeriodFilter;

const PeriodDiv = styled.div`
	font-size: var(--font-size-14);
	font-family: 'Noto Sans KR', sans-serif;
	margin: 24px 0;
`;

const Arrow = styled.span`
	padding-left: 13px;
`;

const SelectButton = styled.button`
	height: 36px;
	border: 1px solid #dadce0;
	border-radius: 4px;
	font-weight: 500;
	padding: 0px 15px 0px 14px;
	background-color: white;
	cursor: pointer;
	&:hover {
		background-color: #fdf3ef;
		color: #e16e38;
		font-weight: 500;
		border: 1px solid #e16e38;
	}
`;

const YearDiv = styled.div`
	position: absolute;
	z-index: 100;
	background-color: white;
	line-height: 31px;
	box-shadow: 0px 4px 14px 0px #00000033;
`;

const Year = styled.div`
	width: 143px;
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
