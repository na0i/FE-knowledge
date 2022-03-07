import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAutoComplete } from 'src/API/search';
import { debounce } from 'lodash';
import { ReactComponent as Zoom } from 'src/assets/zoom.svg';
import { highlight } from 'src/utils/highlight/highlight';
import styled from 'styled-components';

// import { request } from 'src/utils/axios';
/*************************************** JSX ***************************************/
export const SearchBoxComp = ({ font, height, text }) => {
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
		else localStorage.setItem('autoComplete', true);
	};

	useEffect(() => {
		return () => {
			setMounted(false);
		};
	}, []);

	return (
		<SearchBoxLayout>
			<SearchBox height={height} autoCompleteData={autoCompleteData}>
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
					<Zoom width={`${height / 2}`} height={`${height / 2}`} onClick={() => gotoSearchPage(searchText)} />
				</button>
			</SearchBox>
			<AutoCompleteLayout>
				<AutoComplete focus={inputFocus}>
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
	min-width: 800px;
	width: 800px;
	max-width: 1200px;
`;

export const SearchBox = styled.div`
	width: 100%;
	max-width: 1200px;
	height: ${(props) => `${props.height}px`};
	border: 1px solid #3352a4;
	display: flex;
	input {
		width: ${(props) => `${100 - (props.height / 10 + 2)}%`};
		height: ${(props) => `${props.height - 2}px`};
		border: none;
		outline: none;
		&::placeholder {
			font-weight: bold;
			color: #3352a4;
		}
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: ${(props) => `${props.height / 10 + 2}%`};
		height: ${(props) => `${props.height - 2}px`};
		border: none;
		cursor: pointer;
		background: #3352a4;
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

export const AutoComplete = styled.ul`
	display: ${(props) => (props.focus ? 'block' : 'none')};
	position: absolute;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	box-shadow: 0 2px 3px 0 rgb(0 1 3 / 7%);
	width: 800px;
	li {
		list-style: none;
		padding: 1rem 1.5rem;
		background: white;
		&:hover {
			background: #f5f5f5;
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
	width: 800px;
	max-width: 1200px;
`;
