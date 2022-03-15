import React from 'react';
import styled from 'styled-components';
import { highlight } from 'src/utils/highlight/highlight';
import { useNavigate } from 'react-router-dom';
import { UseLocationQuery } from 'src/utils/useLocation';
import rootStore from 'src/stores/rootStore';

const PaperList = ({ paper }) => {
	const search = UseLocationQuery();
	const navigate = useNavigate();
	const { searchStore } = rootStore();

	return (
		<PaperListLayout key={paper.id}>
			<div>
				<TitleLayout className="justify-between">
					<Title className="title-font f-20 m-0" onClick={() => navigate(`/search/paper?id=${paper.id}`)}>
						{search.q ? highlight(paper.title, search.q) : paper.title}
					</Title>
					<AddPaperBtn onClick={() => searchStore.addInterestedPaper(paper)}>관심 등록</AddPaperBtn>
				</TitleLayout>
				<li>
					<ListTitle>저자</ListTitle>
					{paper.authors.map((author, idx) => {
						return idx + 1 < paper.authors.length ? author + ', ' : author;
					})}
				</li>
				<li>
					<ListTitle>개념어</ListTitle>
					<p>
						{paper.concepts.map((concept, idx) => {
							return (
								<a key={idx} href={`/conceptFilter?ci=${concept.conceptId}`}>
									{idx + 1 < paper.concepts.length ? concept.text + ',' : concept.text}
								</a>
							);
						})}
					</p>
				</li>
				<li>
					<ListTitle>주제어</ListTitle>
					<a href={`/subjectFilter?si=${paper.subject.subjectId}`}>
						[{paper.subject.subjectId}: {paper.subject.text}]
					</a>
				</li>
			</div>
		</PaperListLayout>
	);
};

export default PaperList;

/******************************** styled-components ********************************/

const PaperListLayout = styled.ul`
	width: 100%;
	padding: 0.5rem 1.5rem;
	padding: 2rem 1.5rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	li {
		font-size: 0.9rem;
		display: flex;
		list-style: none;
		margin: 0.8rem;
		line-height: 1;
	}
`;

const Title = styled.div`
	line-height: 1.5;
	cursor: pointer;
	&:hover {
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;

const TitleLayout = styled.div`
	width: 100%;
	padding: 0 8px 8px 8px;
`;

const ListTitle = styled.div`
	color: #7f7f7f;
	min-width: 120px;
`;

const AddPaperBtn = styled.button`
	border: 1px solid #efefef;
	margin-left: 1rem;
	width: 100px;
	min-width: 100px;
	height: 35px;
	max-height: 35px;
	font-weight: bold;
	cursor: pointer;
	background: white;
	border-radius: 5px;
	&:hover {
		background: #f5f5f5;
	}
`;
