import React, { useState } from 'react';

import { SearchFilter } from './searchFilter';
import { InputSearch } from './inputSearch';
import { ConceptSearch } from './conceptSearch';
import { SubjectSearch } from './subjectSearch';
import rootStore from 'src/stores/rootStore';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { AutoComplete } from './autoComplete/autoComplete';

// import { request } from 'src/utils/axios';

/*************************************** JSX ***************************************/
export const SearchBoxComp = observer(({ font, width, height, selectWidth, text }) => {
	const { searchFilterStore } = rootStore();
	const [inputfocus, setInputFocus] = useState(false);

	//auto toggle
	const autoToggle = () => {
		let state = localStorage.getItem('autoComplete');
		if (state) localStorage.removeItem('autoComplete');
		else localStorage.setItem('autoComplete', 'off');
	};

	const handleInputForm = (width, height) => {
		switch (searchFilterStore.searchFilterName) {
			case '논문':
				return (
					<InputSearch
						width={width}
						height={height}
						text={text}
						inputFocus={inputfocus}
						font={font}
						setInputFocus={setInputFocus}
					/>
				);
			case '개념어':
				return (
					<ConceptSearch
						width={width}
						height={height}
						text={text}
						inputFocus={inputfocus}
						font={font}
						setInputFocus={setInputFocus}
					/>
				);
			case '주제어':
				return <SubjectSearch selectWidth={selectWidth} height={height} />;
			default:
				break;
		}
	};

	return (
		<SearchBoxLayout width={width}>
			<SearchBox inputFocus={inputfocus} height={height}>
				<SearchFilter />
				{handleInputForm(width, height)}
			</SearchBox>
			<AutoComplete width={width} inputfocus={inputfocus} autoToggle={autoToggle} />
		</SearchBoxLayout>
	);
});

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
	justify-content: space-between;
`;
