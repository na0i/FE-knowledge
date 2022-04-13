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
						<span>
							{props.info.authors.map((author, idx) => {
								return idx + 1 < props.info.authors.length ? author + ', ' : author;
							})}
						</span>
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
						<span>{props.info.issuer}</span>
					</li>
					<li>
						<ListTitle>학술지명</ListTitle>
						<span>{props.info.journal}</span>
					</li>
					<li>
						<ListTitle>권호사항</ListTitle>
						<span>{props.info.recommendations}</span>
					</li>
					<li>
						<ListTitle>발행연도</ListTitle>
						<span>{props.info.year}</span>
					</li>
					<li>
						<ListTitle>작성언어</ListTitle>
						<span>{props.info.language}</span>
					</li>
					<li>
						<ListTitle>등재정보</ListTitle>
						<span>{props.info.listing}</span>
					</li>
					<li>
						<ListTitle>자료형태</ListTitle>
						<span>{props.info.form}</span>
					</li>
					<li>
						<ListTitle>수록면</ListTitle>
						<span>{props.info.page}</span>
					</li>
					<li>
						<ListTitle>KCI 피인용횟수</ListTitle>
						<span>{props.info.citations}</span>
					</li>
					<li>
						<ListTitle>제공처</ListTitle>
						<span>{props.info.source}</span>
					</li>
					<li>
						<ListTitle>소장기관</ListTitle>
						<span>{props.info.holdingInstitution}</span>
					</li>
				</div>
			</PaperInfoLayout>
		</>
	);
};

export default PaperInfo;

/******************************** styled-components ********************************/

const PaperInfoLayout = styled.ul`
	width: 380px;
	li {
		font-size: 0.9rem;
		display: flex;
		list-style: none;
		margin-bottom: 8px;
		font-size: var(--font-size-14);
		color: var(--color-black-text4);
		line-height: 20px;
	}
	span {
		color: black;
	}
`;

const ListTitle = styled.div`
	color: #7f7f7f;
	min-width: 120px;
`;
