import React, { useState, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SearchButton } from '../button/searchButton';
import { FilterDropDown } from '../button/filterDropdown';
import { getSubjectData } from 'src/API/subject';

export const SubjectSearch = ({ inputfocus, height, selectWidth }) => {
	const navigate = useNavigate();
	const [filterData, setFilterData] = useState(null);
	const [valueLargeOptions, setValueLargeOptions] = useState([]);
	const [valueLarge, setValueLarge] = useState('');
	const [largeRef, setLargeRef] = useState(0);
	const [valueMiddleOptions, setValueMiddleOptions] = useState([]);
	const [middleRef, setMiddleRef] = useState(0);
	const [valueMiddle, setValueMiddle] = useState('');
	const [valueSubOptions, setValueSubOptions] = useState([]);
	const [valueSub, setValueSub] = useState('');
	const [middleId, setMiddleId] = useState(0);
	const [subId, setSubId] = useState(0);

	const handleLargeOption = () => {
		// console.log(filterData?.filter((item) => item.refId === null));
		setValueLarge(filterData[0]?.text);
		setLargeRef(filterData[0]?.id);
		setValueLargeOptions(filterData?.filter((item) => item.refId === null));
	};
	const handleMiddleOption = (opt) => {
		// console.log(filterData?.filter((item) => item.refId === opt.id));
		setLargeRef(opt.id);
		setMiddleId(opt.id);
		setValueLarge(opt.text);
		setValueMiddle('');
		setValueSub('');
		setValueMiddleOptions(filterData?.filter((item) => item.refId === opt.id));
	};
	const handleSubOptions = (opt) => {
		// console.log(filterData?.filter((item) => item.refId === opt.id));
		setSubId(opt.id);
		setMiddleRef(opt.id);
		setValueMiddle(opt.text);
		setValueSub('');
		setValueSubOptions(filterData?.filter((item) => item.refId === opt.id));
	};

	const handleSubTemp = (opt) => {
		setValueSub(opt.text);
	};

	const handleLarge = (val) => {
		setValueLarge(val);
		setValueLargeOptions(filterData?.filter((item) => item.refId === null && item.text.includes(val)));
	};

	const handleMiddle = (val) => {
		setValueMiddle(val);
		setValueMiddleOptions(filterData?.filter((item) => item.refId === largeRef && item.text.includes(val)));
	};

	const handleSub = (val) => {
		setValueSub(val);
		setValueSubOptions(filterData?.filter((item) => item.refId === middleRef && item.text.includes(val)));
	};

	// go to search page
	const gotoSearchPage = () => {
		if (subId) navigate(`/subjectFilter?si=${subId}`);
		else if (middleId) {
			navigate(`/subjectFilter?si=${middleId}`);
		} else {
			alert('하위 주제를 선택해주세요');
		}
	};

	const fetchFilterData = async () => {
		const res = await getSubjectData();
		setFilterData(res);
	};

	useEffect(() => {
		if (!filterData) {
			fetchFilterData();
		} else {
			handleLargeOption();
		}
	}, [filterData]);

	// { data, onChange, value, width, height }
	return (
		<>
			<FilterLayer height={height}>
				<FilterDropDown
					search
					width={selectWidth}
					data={valueLargeOptions}
					onSelect={handleMiddleOption}
					onChange={handleLarge}
					value={valueLarge}
					height={35}
				/>
				<FilterDropDown
					search
					width={selectWidth}
					data={valueMiddleOptions}
					onSelect={handleSubOptions}
					onChange={handleMiddle}
					value={valueMiddle}
					height={35}
				/>
				<FilterDropDown
					search
					onSelect={handleSubTemp}
					width={selectWidth}
					height={35}
					data={valueSubOptions}
					onChange={handleSub}
					value={valueSub}
				/>
			</FilterLayer>
			<SearchButton height={height} onClick={() => gotoSearchPage()} inputfocus={inputfocus} />
		</>
	);
};

const FilterLayer = styled.div`
	width: ${(props) => `${100 - props.height / 10}%`};
	display: flex;
	justify-content: left;
	align-items: center;
`;
