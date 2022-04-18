import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import rootStore from 'src/stores/rootStore';
import { highlight } from 'src/utils/highlight/highlight';
import { useNavigate } from 'react-router-dom';
import { UseLocationQuery } from 'src/utils/useLocation';
import { ReactComponent as Star } from 'src/assets/star.svg';
import { ReactComponent as YellowStar } from 'src/assets/star-yellow.svg';

const PaperList = observer(({ paper }) => {
	const search = UseLocationQuery();
	const navigate = useNavigate();
	const { searchStore } = rootStore();

	const [isHere, setIsHere] = useState(false);
	const checkIsHere = (paperId) => {
		let check = searchStore.interestedPapers.find((item) => item.id === paperId);
		check ? setIsHere(true) : setIsHere(false);
	};

	useEffect(() => checkIsHere(paper.id), [searchStore.flag]);

	return (
		<PaperListLayout key={paper.id}>
			<div>
				<TitleLayout className="justify-between">
					<Title className="title-font m-0" onClick={() => navigate(`/search/paper?id=${paper.id}`)}>
						{search.q ? highlight(paper.title, search.q) : paper.title}
					</Title>
					{isHere ? (
						<AddPaperBtn className="center" onClick={() => searchStore.removeInterestedPaper(paper)}>
							<YellowStar />
							관심해제
						</AddPaperBtn>
					) : (
						<AddPaperBtn className="center" onClick={() => searchStore.addInterestedPaper(paper)}>
							<Star />
							관심등록
						</AddPaperBtn>
					)}
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
});

export default PaperList;

/******************************** styled-components ********************************/

const PaperListLayout = styled.ul`
	width: 990px;
	padding: 19px 0;
	border-top: 1px solid #f0f0f0;
	li {
		font-size: var(--font-size-14);
		display: flex;
		list-style: none;
		margin: 10px 0;
		line-height: 1;
		a {
			color: var(--color-blue-point);
		}
	}
`;

const Title = styled.div`
	max-width: 849px;
	padding-bottom: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	line-height: 29px;
	cursor: pointer;
	font-size: var(--font-size-20);
	&:hover {
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;

const TitleLayout = styled.div`
	width: 100%;
`;

const ListTitle = styled.div`
	color: #7f7f7f;
	font-size: 14px;
	min-width: 120px;
`;

const AddPaperBtn = styled.button`
	width: 91px;
	height: 32px;
	cursor: pointer;
	font-size: var(--font-size-12);
	color: var(--color-black-text3);
	background: #ffffff;
	border: 1px solid var(--color-gray-button);
	box-sizing: border-box;
	border-radius: 4px;
	margin-left: 50px;
	&:hover {
		border: 1px solid var(--color-gray-button-hover);
		background: var(--color-white-hover);
	}
	svg {
		margin-right: 4px;
	}
`;
