import React, { useState, useEffect } from 'react';
import { SearchDropdown } from 'src/components/button/searchDropdown';

export const SubjectSelector = ({ data }) => {
	const [valueLargeOptions, setValueLargeOptions] = useState([]);
	const [valueLarge, setValueLarge] = useState('');
	const [largeRef, setLargeRef] = useState(0);
	const [valueMiddleOptions, setValueMiddleOptions] = useState([]);
	const [middleRef, setMiddleRef] = useState(0);
	const [valueMiddle, setValueMiddle] = useState('');
	const [valueSubOptions, setValueSubOptions] = useState([]);
	const [valueSub, setValueSub] = useState('');

	const handleLargeOption = (text) => {
		setValueLarge(data[0]?.text);
		setLargeRef(data[0]?.id);
		setValueLargeOptions(data?.filter((item) => item.refId === null));
	};
	const handleMiddleOption = (id, text) => {
		setLargeRef(id);
		setValueLarge(text);
		setValueMiddle('');
		setValueSub('');
		setValueMiddleOptions(data?.filter((item) => item.refId === id));
	};
	const handleSubOptions = (id, text) => {
		setMiddleRef(id);
		setValueMiddle(text);
		setValueSub('');
		setValueSubOptions(data?.filter((item) => item.refId === id));
	};

	const handleSubTemp = (id, text) => {
		setValueSub(text);
	};

	const handleLarge = (e) => {
		setValueLarge(e.target.value);
		setValueLargeOptions(data?.filter((item) => item.refId === null && item.text.includes(e.target.value)));
	};

	const handleMiddle = (e) => {
		setValueMiddle(e.target.value);
		setValueMiddleOptions(data?.filter((item) => item.refId === largeRef && item.text.includes(e.target.value)));
	};

	const handleSub = (e) => {
		setValueSub(e.target.value);
		setValueSubOptions(data?.filter((item) => item.refId === middleRef && item.text.includes(e.target.value)));
	};

	useEffect(() => {
		handleLargeOption();
	}, [data]);

	return (
		<>
			<SearchDropdown
				onSelect={handleMiddleOption}
				onChange={handleLarge}
				value={valueLarge}
				options={valueLargeOptions}
			/>
			<SearchDropdown
				onSelect={handleSubOptions}
				onChange={handleMiddle}
				value={valueMiddle}
				options={valueMiddleOptions}
			/>
			<SearchDropdown onSelect={handleSubTemp} onChange={handleSub} value={valueSub} options={valueSubOptions} />
		</>
	);
};
