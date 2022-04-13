import React from 'react';
import styled from 'styled-components';
import { RouteButton, LabelButton } from 'src/components/button/subjectButton';

export const FilterButtonLayer = ({ title, data, type, onClick }) => {
	return (
		<>
			<Title>{title}</Title>
			{type === 'label' ? (
				<SubjectButtonBox>
					{data?.map((label) => (
						<RouteButton onClick={() => onClick(label.id)} key={label.id} text={label.text} />
					))}
				</SubjectButtonBox>
			) : (
				<>
					<SubjectButtonBox>
						{data?.map((label) => (
							<LabelButton onClick={() => onClick(label.id)} key={label.id} text={label.text} />
						))}
					</SubjectButtonBox>
				</>
			)}
		</>
	);
};

const Title = styled.p`
	font-size: 0.875rem;
	font-weight: 700;
	margin: 10px 0;
`;

const SubjectButtonBox = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;
