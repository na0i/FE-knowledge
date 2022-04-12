import React from 'react';
import { useState } from 'react';
import listOpen from '../../assets/listOpen.svg';
import listClose from '../../assets/listClose.svg';
import styled from 'styled-components';

const PeriodFilter = ({ years, selectedYear, onSelectedYear }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<PeriodDiv>
			<SelectButton onClick={() => openDropdown()} className="mt-16 mb-16">
				<span>{selectedYear}</span>
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
					years.map((year) => {
						if (year.id === 0) {
							return (
								<Year
									key={year.id}
									selected={year.name == selectedYear}
									onClick={() => onSelectedYear(year)}
								>
									전체보기
								</Year>
							);
						} else if (year.id === 5) {
							return (
								<Year
									key={year.id}
									selected={year.name == selectedYear}
									onClick={() => onSelectedYear(year)}
								>
									{year.name}
								</Year>
							);
						} else {
							return (
								<Year
									key={year.id}
									selected={year.name == selectedYear}
									onClick={() => onSelectedYear(year)}
								>
									{year.name}년 부터
								</Year>
							);
						}
					})}
			</YearDiv>
		</PeriodDiv>
	);
};

export default PeriodFilter;

const PeriodDiv = styled.div`
	font-size: var(--font-size-14);
	font-family: 'Noto Sans KR', sans-serif;
`;

const Arrow = styled.span`
	padding-left: 13px;
`;

const SelectButton = styled.button`
	width: 104px;
	height: 36px;
	border: 1px solid #dadce0;
	border-radius: 4px;
	font-weight: 500;
	margin-bottom: 4px;
	background-color: white;
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
		props.selected
			? `
  background-color: #FDF3EF;
  color: #E16E38;
  `
			: `none`};
`;
