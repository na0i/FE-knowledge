import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import rootStore from 'src/stores/rootStore';
import { useNavigate } from 'react-router-dom';
import { PaperComplete } from './paperComplete';
import { ConceptComplete } from './conceptComplete';

export const AutoComplete = observer(({ width, inputfocus, autoToggle }) => {
	const navigate = useNavigate();
	const isToggle = localStorage.getItem('autoComplete');
	const { autoCompleteStore, searchFilterStore } = rootStore();

	const gotoPaper = (id) => {
		navigate(`/search/paper?id=${id}`);
	};

	const gotoConcept = (id) => {
		navigate(`/conceptFilter?ci=${id}`);
	};

	const handleCompleteForm = () => {
		if (searchFilterStore.searchFilterName === '논문') {
			return autoCompleteStore.autoCompleteData?.map((list) => (
				<PaperComplete key={list.id} list={list} onClick={gotoPaper} isToggle={isToggle} />
			));
		} else {
			return autoCompleteStore.autoCompleteData?.map((list) => (
				<ConceptComplete key={list.id} list={list} onClick={gotoConcept} isToggle={isToggle} />
			));
		}
	};

	return (
		<AutoCompleteLayout width={width}>
			<AutoCompleteBox focus={inputfocus} autoComplete={isToggle}>
				{!isToggle ? handleCompleteForm() : <li autoComplete={isToggle}>자동완성 기능이 꺼져있습니다.</li>}
				<AutoButtonLayout autoComplete={isToggle}>
					<span onClick={() => autoToggle()}>자동완성 {!isToggle ? ' 끄기' : ' 켜기'}</span>
				</AutoButtonLayout>
			</AutoCompleteBox>
		</AutoCompleteLayout>
	);
});

const AutoCompleteLayout = styled.div`
	z-index: 9999999;
	width: ${(props) => `${props.width}px`};
`;

const AutoCompleteBox = styled.ul`
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
