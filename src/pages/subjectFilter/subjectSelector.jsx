import React, { useState, useEffect } from 'react';
import { SearchDropdown } from 'src/components/button/searchDropdown';

export const SubjectSelector = () => {
	const [valueLargeOptions, setValueLargeOptions] = useState([]);
	const [valueLarge, setValueLarge] = useState('');
	const [valueMiddleOptions, setValueMiddleOptions] = useState([]);
	const [valueMiddle, setValueMiddle] = useState('');
	const [valueSubOptions, setValueSubOptions] = useState([]);
	const [valueSub, setValueSub] = useState('');

	const handleLarge = (e) => {
		setValueLarge(e.target.value);
	};

	const handleMiddle = (e) => {
		setValueMiddle(e.target.value);
	};

	const handleSub = (e) => {
		setValueSub(e.target.value);
	};

	return (
		<>
			<SearchDropdown onChange={handleLarge} value={valueLarge} options={valueLargeOptions} />
			<SearchDropdown onChange={handleMiddle} value={valueMiddle} options={valueMiddleOptions} />
			<SearchDropdown onChange={handleSub} value={valueSub} options={valueSubOptions} />
		</>
	);
};
