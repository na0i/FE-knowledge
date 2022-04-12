import React, { useEffect } from 'react';
import styled from 'styled-components';
import Dropdown from 'src/components/button/dropdown';
import rootStore from 'src/stores/rootStore';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

// dropdown option state
const recommandOption = [
	{ value: '중요도 순', default: true },
	{ value: '최신순', default: false },
];

const InterestedPaper = observer(() => {
	const navigate = useNavigate();
	const { searchStore } = rootStore();
	useEffect(() => searchStore.getInterestedPapers(), []);

	return (
		<InterestedLayout>
			<div className="justify-between">
				<h1 className="f-24 justify-between title-font">
					관심있는 논문
					<Dropdown options={recommandOption} font={14} />
				</h1>
			</div>

			<>
				{searchStore.interestedPapers?.map((paper) => (
					<Paper key={paper.id}>
						<LeftBox>
							<div key={paper.id} onClick={() => navigate(`/search/paper?id=${paper.id}`)}>
								{paper.title}
							</div>
						</LeftBox>
						<RightBox>
							<RemoveButton onClick={() => searchStore.removeInterestedPaper(paper)}>
								관심 해제
							</RemoveButton>
						</RightBox>
					</Paper>
				))}
			</>
		</InterestedLayout>
	);
});

export default InterestedPaper;

const LeftBox = styled.div`
	color: #55a3d7;
	width: 92%;
	float: left;
	/* margin: 20px 0px 10px 0px; */
	cursor: pointer;
	&:hover {
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;

const RightBox = styled.div`
	width: 8%;
	float: left;
	/* margin: 10px 0px 10px 0px; */
	justify-content: center;
`;

const RemoveButton = styled.button`
	display: block;
	border: 1px solid #efefef;
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

const InterestedLayout = styled.ul`
	margin: 5rem 0;
	width: 100%;
	h1 {
		width: 100%;
		padding: 2rem 1rem 1rem 1rem;
		border-bottom: 1px solid #efefef;
	}
	font-family: 'Noto Sans KR', sans-serif;
`;

const Paper = styled.div`
	padding: 1.7rem 0;
`;
