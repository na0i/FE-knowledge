import React from 'react';
import styled from 'styled-components';

/************************************* jsx *************************************/

const PaperInfo = (props) => {
	return (
		<>
			<PaperInfoLayout className="column">
				<div className="title-font">
					<li>
						<ListTitle>저자</ListTitle>
						{props.info.authors.map((author, idx) => {
							return idx + 1 < props.info.authors.length ? author + ', ' : author;
						})}
					</li>
					<li>
						<ListTitle>개념어</ListTitle>
						<p>
							{props.info.concepts.map((concept, idx) => {
								return (
									<a key={idx} href={`/conceptFilter?ci=${concept.conceptId}`}>
										{idx + 1 < props.info.concepts.length ? concept.text + ',' : concept.text}
									</a>
								);
							})}
						</p>
					</li>
					<li>
						<ListTitle>주제어</ListTitle>
						<a href={`/subjectFilter?si=${props.info.subject.subjectId}`}>
							[{props.info.subject.subjectId}: {props.info.subject.text}]
						</a>
					</li>
					<li>
						<ListTitle>발행기관</ListTitle>
						{props.info.issuer}
					</li>
					<li>
						<ListTitle>학술지명</ListTitle>
						{props.info.journal}
					</li>
					<li>
						<ListTitle>권호사항</ListTitle>
						{props.info.recommendations}
					</li>
					<li>
						<ListTitle>발행연도</ListTitle>
						{props.info.year}
					</li>
					<li>
						<ListTitle>작성언어</ListTitle>
						{props.info.language}
					</li>
					<li>
						<ListTitle>등재정보</ListTitle>
						{props.info.listing}
					</li>
					<li>
						<ListTitle>자료형태</ListTitle>
						{props.info.form}
					</li>
					<li>
						<ListTitle>수록면</ListTitle>
						{props.info.page}
					</li>
					<li>
						<ListTitle>KCI 피인용횟수</ListTitle>
						{props.info.citations}
					</li>
					<li>
						<ListTitle>제공처</ListTitle>
						{props.info.source}
					</li>
					<li>
						<ListTitle>소장기관</ListTitle>
						{props.info.holdingInstitution}
					</li>
				</div>
			</PaperInfoLayout>
		</>
	);
};

export default PaperInfo;

/******************************** styled-components ********************************/

const PaperInfoLayout = styled.ul`
	max-width: 35vw;
	padding: 1rem;
	li {
		font-size: 0.9rem;
		display: flex;
		list-style: none;
		margin: 1rem;
		line-height: 1.5;
	}
`;

const ListTitle = styled.div`
	color: #7f7f7f;
	min-width: 150px;
`;
