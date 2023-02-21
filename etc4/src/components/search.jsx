import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAutoComplete } from 'src/API/search';
import { debounce } from 'lodash';
import { ReactComponent as Zoom } from 'src/assets/zoom.svg';
import styled from 'styled-components';

// import { request } from 'src/utils/axios';

/*************************************** JSX ***************************************/
export const SearchBoxComp = ({ font, width, height, text }) => {
	const navigate = useNavigate();
	const [mounted, setMounted] = useState(true);
	const [searchText, setSearchText] = useState(text ? text : '');
	const [autoCompleteData, setAutoCompleteData] = useState([]);
	const [inputFocus, setInputFocus] = useState(false);
	const searchDebounce = useMemo(
		() =>
			debounce((val) => {
				getAutoCompleteData(val);
			}, 200),
		[],
	);

	const getAutoCompleteData = async (text) => {
		const res = await getAutoComplete('GET', 'url');
		// if (res.result) setAutoComplete(res.result);
		// else setAutoComplete([]);
		if (text?.includes('학술')) setAutoCompleteData(res);
		else setAutoCompleteData([]);
	};

	// input test change
	const textChange = useCallback(
		(text) => {
			if (text === '') {
				setSearchText('');
				setAutoCompleteData([]);
			} else {
				setSearchText(text);
				if (mounted && !localStorage.getItem('autoComplete')) searchDebounce(text);
			}
		},
		[mounted, searchDebounce],
	);

	// go to search page
	const gotoSearchPage = (searchText) => {
		if (searchText) navigate(`/search?q=${searchText}`);
	};

	// input focus out
	const inputFocusOut = () => {
		setTimeout(function () {
			if (inputFocus) setInputFocus(false);
		}, 100);
	};

	//auto toggle
	const autoToggle = () => {
		let state = localStorage.getItem('autoComplete');
		if (state) localStorage.removeItem('autoComplete');
		else localStorage.setItem('autoComplete', 'off');
	};

	useEffect(() => {
		return () => {
			setMounted(false);
		};
	}, []);

	return (
		<SearchBoxLayout width={width}>
			<SearchBox inputFocus={inputFocus} height={height} autoCompleteData={autoCompleteData}>
				<SearchFilter>
					<Option>논문</Option>
					<Option>개념어</Option>
					<Option>주제어</Option>
				</SearchFilter>
				<input
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
				<button>
					<Zoom
						inputFocus={inputFocus}
						width={`${height / 2}`}
						height={`${height / 2}`}
						onClick={() => gotoSearchPage(searchText)}
					/>
				</button>
			</SearchBox>
			<AutoCompleteLayout width={width}>
				<AutoComplete focus={inputFocus} autoComplete={localStorage.getItem('autoComplete')}>
					{!localStorage.getItem('autoComplete') ? (
						autoCompleteData.length > 0 &&
						autoCompleteData.map((list) => {
							return (
								<li
									key={list.id}
									autoComplete={localStorage.getItem('autoComplete')}
									className="justify-between pointer"
									onClick={() => navigate(`/search/paper?id=${list.id}`)}
								>
									<AutoCompleteTitle className="title">
										<span>{list.title}</span>
									</AutoCompleteTitle>
									<AutoCompleteInfo>
										{list.author.length > 1 ? `${list.author[0]} 외` : list.author[0]},{' '}
										{list.date.getFullYear()}
									</AutoCompleteInfo>
								</li>
							);
						})
					) : (
						<li autoComplete={localStorage.getItem('autoComplete')}>자동완성 기능이 꺼져있습니다.</li>
					)}
					<AutoButtonLayout autoComplete={localStorage.getItem('autoComplete')}>
						<span onClick={() => autoToggle()}>
							자동완성 {!localStorage.getItem('autoComplete') ? ' 끄기' : ' 켜기'}
						</span>
					</AutoButtonLayout>
				</AutoComplete>
			</AutoCompleteLayout>
		</SearchBoxLayout>
	);
};

/******************************** styled-components ********************************/
export const SearchBoxLayout = styled.div`
	min-width: ${(props) => `${props.width}px`};
	width: ${(props) => `${props.width}px`};
	max-width: 1200px;
`;

export const SearchBox = styled.div`
	width: 100%;
	max-width: 1200px;
	border-radius: ${(props) => (props.inputFocus ? `5px 5px 0 0` : `5px`)};
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	height: ${(props) => `${props.height + 2}px`};
	border: 1px solid var(--color-orange-point);
	display: flex;
	input {
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
	}
	button {
		display: flex;
		align-items: center;
		border-radius: ${(props) => (props.inputFocus ? `0 3px 0 0` : `0 3px 3px 0`)};
		justify-content: center;
		width: ${(props) => `${props.height / 10 + 2}%`};
		height: ${(props) => `${props.height}px`};
		border: none;
		cursor: pointer;
		background: var(--color-orange-point);
		&:focus {
			outline: none;
		}
		&:hover {
			svg {
				path {
					fill: #f5f5f5;
				}
			}
		}
	}
`;

export const SearchFilter = styled.select`
	padding: 10px;
	font-family: 'noto sans KR';
	font-size: var(--font-size-14);
	font-weight: 700;
	width: 20%;
	border: none;
	border-radius: 5px 0 0 5px;
	border-right: 1px solid #dfe1e5;

	:focus {
		outline: none;
	}
`;

export const Option = styled.option`
	border: none;
	:focus {
		outline: none;
	}
	:hover {
		color: var(--color-orange-point);
	}
`;

export const AutoComplete = styled.ul`
	display: ${(props) => (props.focus ? 'block' : 'none')};
	position: absolute;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	border: 1px solid var(--color-orange-point);
	border-top: none;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	width: inherit;
	li {
		list-style: none;
		padding: 1rem 1.5rem;
		background: white;
		&:hover {
			background: ${(props) => (!props.autoComplete ? '#f5f5f5' : '#ffffff')};
			span {
				text-decoration: underline;
				text-underline-position: under;
				color: #0070c0;
			}
		}
	}
`;
const AutoButtonLayout = styled.div`
	text-align: end;
	list-style: none;
	padding: 0.8rem;
	background: #f9fafc;
	border-top: 1px solid #f1f4f6;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	font-size: 0.9rem;
	span {
		cursor: pointer;
		color: grey;
		&:hover {
			text-decoration: underline;
			text-underline-position: under;
		}
	}
`;
export const AutoCompleteTitle = styled.div`
	width: 75%;
	padding: 0.5rem 0;
	color: black;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const AutoCompleteInfo = styled.div`
	color: #afabab;
	padding: 0.5rem 0;
`;

export const HeaderLayout = styled.div`
	width: 100vw;
	margin: auto;
`;

export const AutoCompleteLayout = styled.div`
	width: ${(props) => `${props.width}px`};
`;
