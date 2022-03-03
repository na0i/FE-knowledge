import React from 'react';
import styled from 'styled-components';

const PaperList = ({ paper }) => {
	return (
		<PaperListLayout key={paper.id}>
			<Title className="title-font f-20 m-0 pb-16">{paper.title}</Title>
			<li>
				<ListTitle>저자</ListTitle>
				{paper.authors.map((author, idx) => {
					return idx + 1 < paper.authors.length ? author + ', ' : author;
				})}
			</li>
			<li>
				<ListTitle>개념어</ListTitle>
				{paper.concepts.map((keyword, idx) => {
					return (
						<a key={idx} href="/">
							{idx + 1 < paper.concepts.length ? keyword + ', ' : keyword}
						</a>
					);
				})}
			</li>
			<li>
				<ListTitle>주제어</ListTitle>
				<a href="/">
					{paper.keyword.number} [{paper.keyword.subject}]
				</a>
			</li>
		</PaperListLayout>
	);
};

export default PaperList;

/******************************** styled-components ********************************/

const Title = styled.div`
	color: #3381bd;
	line-height: 1.5;
	cursor: pointer;
	&:hover {
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;

const PaperListLayout = styled.ul`
	padding: 0 1.5rem;
	border-left: 2px solid #ebe6e6;
	margin: 1.2rem 1rem;
`;

const ListTitle = styled.div`
	color: #7f7f7f;
	min-width: 150px;
`;
