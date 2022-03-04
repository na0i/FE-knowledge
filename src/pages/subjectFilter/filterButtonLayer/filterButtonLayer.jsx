import React from 'react';
import styled from 'styled-components';
import { RouteButton, LabelButton } from 'src/components/button/subjectButton';

export const FilterButtonLayer = ({ title, data, type }) => {
	return (
		<>
			<Title>{title}</Title>
			{type === 'label' ? (
				<SubjectButtonBox>
					{data?.map((label) => (
						<RouteButton key={label.id} text={label.text} />
					))}
				</SubjectButtonBox>
			) : (
				<>
					<SubjectButtonBox>
						{data?.map((label) => (
							<LabelButton key={label.id} text={label.text} />
						))}
					</SubjectButtonBox>
				</>
			)}
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
