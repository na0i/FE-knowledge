import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SearchButton } from '../button/searchButton';
import rootStore from 'src/stores/rootStore';

export const ConceptSearch = observer(({ width, height, inputfocus, font, setInputFocus, text }) => {
	const navigate = useNavigate();
	const { autoCompleteStore } = rootStore();

	const [searchText, setSearchText] = useState(text ? text : '');
	const [mounted, setMounted] = useState(true);

	// go to search page
	const gotoSearchPage = () => {
		let val = 0;
		autoCompleteStore.autoCompleteData?.forEach((item) => {
			if (item.text === searchText) val = item.id;
		});
		if (val === 0) {
			alert('해당 개념어가 존재하지 않습니다.');
		} else {
			navigate(`/conceptFilter?ci=${val}&q=${searchText}`, { replace: true });
		}
	};

	const searchByEnter = (e) => {
		if (e.charCode === 13) {
			gotoSearchPage();
		}
	};

	// input focus out
	const inputFocusOut = () => {
		setTimeout(function () {
			setInputFocus(false);
		}, 100);
	};

	const searchDebounce = useMemo(
		() =>
			debounce((val) => {
				autoCompleteStore.getConceptCompleteData(val);
			}, 200),
		[autoCompleteStore],
	);

	const textChange = useCallback(
		(text) => {
			if (text === '') {
				setSearchText('');
				autoCompleteStore.setAutoCompleteData([]);
			} else {
				setSearchText(text);
				if (mounted && !localStorage.getItem('autoComplete')) {
					searchDebounce(text);
				}
			}
		},
		[mounted, searchDebounce, autoCompleteStore],
	);

	useEffect(() => {
		return () => {
			setMounted(false);
		};
	}, []);

	return (
		<>
			<Input
				width={width}
				height={height}
				onFocus={() => {
					setInputFocus(true);
					if (searchText) textChange(searchText);
				}}
				onBlur={() => inputFocusOut()}
				type="text"
				placeholder="개념어를 검색해주세요"
				className={font ? `f-${font} pl-${font}` : ''}
				value={searchText}
				onChange={(e) => textChange(e.target.value)}
				onKeyPress={searchByEnter}
			/>
			<SearchButton height={height} onClick={() => gotoSearchPage(searchText)} inputfocus={inputfocus} />
		</>
	);
});

const Input = styled.input`
	font-family: 'noto sans KR';
	font-size: var(--font-size-14);
	font-weight: 500;
	width: ${(props) => `${100 - props.height / 10}%`};
	height: ${(props) => `${props.height}px`};
	border: none;
	outline: none;
	&::placeholder {
		color: #b4b4b4;
	}
`;
