import React from 'react';
import styled from 'styled-components';
import { SubjectButton } from 'src/components/button/subjectButton';

export const FilterButtonLayer = ({ title, data }) => {
	return (
		<>
			<Title>{title}</Title>
			<SubjectButtonBox>
				{data?.map((label) => (
					<SubjectButton key={label.id} text={label.text} />
				))}
			</SubjectButtonBox>
		</>
	);
};

const Title = styled.p`
	font-size: 1.1rem;
	margin: 10px 0;
`;

const SubjectButtonBox = styled.div`
	width: 80%;
	display: flex;
	flex-wrap: wrap;
`;
