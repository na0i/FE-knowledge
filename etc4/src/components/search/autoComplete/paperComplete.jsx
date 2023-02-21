import React from 'react';
import styled from 'styled-components';

export const PaperComplete = ({ list, isToggle, onClick }) => {
	return (
		<li autoComplete={isToggle} className="justify-between pointer" onClick={() => onClick(list.id)}>
			<AutoCompleteTitle className="title">
				<span>{list.title}</span>
			</AutoCompleteTitle>
			<AutoCompleteInfo>
				{list.author?.length > 1 ? `${list.author[0]} 외` : list.author[0]}, {list.date.getFullYear()}
			</AutoCompleteInfo>
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
