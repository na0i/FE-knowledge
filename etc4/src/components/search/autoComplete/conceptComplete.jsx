import React from 'react';
import styled from 'styled-components';

export const ConceptComplete = ({ list, isToggle, onClick }) => {
	return (
		<li autoComplete={isToggle} className="justify-between pointer" onClick={() => onClick(list.id)}>
			<AutoCompleteTitle className="title">
				<span>{list.text}</span>
			</AutoCompleteTitle>
			<AutoCompleteInfo>이동하기 {'>'}</AutoCompleteInfo>
		</li>
	);
};

const AutoCompleteTitle = styled.div`
	width: 75%;
	padding: 0.5rem 0;
	color: black;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const AutoCompleteInfo = styled.div`
	color: #afabab;
	padding: 0.5rem 0;
`;
