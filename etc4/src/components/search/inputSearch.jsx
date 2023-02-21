import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SearchButton } from '../button/searchButton';
import rootStore from 'src/stores/rootStore';
import { UseLocationQuery } from 'src/utils/useLocation';

export const InputSearch = observer(({ width, height, inputfocus, font, setInputFocus, text }) => {
	const navigate = useNavigate();
	const { autoCompleteStore } = rootStore();
	const search = UseLocationQuery();
	const [searchText, setSearchText] = useState(text ? text : '');
	const [mounted, setMounted] = useState(true);

	// go to search page
	const gotoSearchPage = (searchText) => {
		if (searchText) navigate({ pathname: '/search', search: `?q=${searchText}&p=1` });
		window.location.reload(true);
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
				autoCompleteStore.getAutoCompleteData(val);
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

	useEffect(() => {
		if (search.q) textChange(search.q);
	}, [search.q]);

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
				placeholder="무엇을 찾고 싶으신가요?"
				className={font ? `f-${font} pl-${font}` : ''}
				value={searchText}
				onChange={(e) => textChange(e.target.value)}
				onKeyPress={(e) => {
					if (e.code === 'Enter') gotoSearchPage(searchText);
				}}
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
