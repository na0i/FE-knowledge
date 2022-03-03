import React from 'react';
import { useNavigate } from 'react-router-dom';
import MoreButton from 'src/components/moreButton';
import styled from 'styled-components';
import { highlight } from 'src/utils/highlight/highlight';
import { UseLocationQuery } from 'src/utils/useLocation';

const SearchResult = ({ paperList, addSelectedPaper }) => {
	const search = UseLocationQuery();
	const navigate = useNavigate();
	return (
		<div>
			<Top>
				<span>검색결과 {paperList.length}건</span>
				<FilterButton>관련도 순</FilterButton>
			</Top>
			<hr />

			<div>
				{paperList?.map((paper) => (
					<div key={paper.id}>
						<BoxContainer>
							<LeftBox>
								<Title onClick={() => navigate(`/search/paper?id=${paper.id}`)}>
									{highlight(paper.title, search.q)}
								</Title>
								<List>
									<span>저자: </span>
									{paper.authors.map((author, idx) => {
										return idx + 1 < paper.authors.length ? author + ', ' : author;
									})}
								</List>
								<List>
									<span>개념어: </span>
									{paper.conceptWords.map((conceptWord, idx) => {
										if (idx + 1 !== paper.conceptWords.length) {
											return (
												<span key={idx}>
													<ListElements>{conceptWord}</ListElements>,{' '}
												</span>
											);
										}
										return <ListElements key={idx}>{conceptWord}</ListElements>;
									})}
								</List>
								<List>
									<span>주제어: </span>
									<ListElements>
										[{paper.subjectNum}:{' '}
										{paper.subjectName.map((subject, idx) => {
											return idx + 1 !== paper.subjectName.length ? subject + ', ' : subject;
										})}
										]
									</ListElements>
								</List>
							</LeftBox>
							<RightBox>
								<AddButton onClick={() => addSelectedPaper(paper)}>+</AddButton>
							</RightBox>
						</BoxContainer>
					</div>
				))}
			</div>

			<MoreButton />
		</div>
	);
};

export default SearchResult;

// styled component
const Top = styled.div`
	display: flex;
	margin: 16px 0px 16px 0px;
	justify-content: space-between;
`;

const BoxContainer = styled.div`
	display: flex;
	align-items: center;
`;

const LeftBox = styled.div`
	width: 95%;
	margin: 0.2rem 0 0.2rem 0;
`;

const RightBox = styled.div`
	width: 5%;
`;

const FilterButton = styled.button`
	background-color: white;
	border: 1px solid;
	border-radius: 7%;
`;

const AddButton = styled.button`
	background-color: white;
	border-radius: 100%;
	font-size: 20px;
	width: 30px;
`;

const Title = styled.div`
	font-size: 17px;
	line-height: 1.5;
	cursor: pointer;
	&:hover {
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;

const List = styled.div`
	margin: 0.3rem;
`;

const ListElements = styled.span`
	&:hover {
		color: #3381bd;
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;
