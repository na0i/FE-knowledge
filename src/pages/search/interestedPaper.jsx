import React, { useEffect } from 'react';
import styled from 'styled-components';
import MoreButton from 'src/components/moreButton';
import Dropdown from 'src/components/dropdown';
import { removeFromInterested } from 'src/utils/removeFromInterested';
// dropdown option state
const recommandOption = [
	{ value: '중요도 순', default: true },
	{ value: '최신순', default: false },
];

const InterestedPaper = ({ selectedPapers, removeSelectedPaper }) => {

	return (
		<InterestedLayout>
			<div className="justify-between">
				<h1 className="f-24 justify-between title-font">
					관심있는 논문
					<Dropdown options={recommandOption} font={14} />
				</h1>
			</div>

			<div>
				{selectedPapers?.map((paper) => (
					<div key={paper.id}>
						<LeftBox>
							<div key={paper.id}>{paper.title}</div>
						</LeftBox>
						<RightBox>
							<RemoveButton onClick={() => removeSelectedPaper(paper)}>-</RemoveButton>
						</RightBox>
					</div>
				))}
			</div>
			
			<>
			{(selectedPapers.length > 0) ?<MoreButton /> : <></>}
			</>
		</InterestedLayout>
	);
};

export default InterestedPaper;

const LeftBox = styled.div`
	color: #55a3d7;
	width: 95%;
	float: left;
	margin: 10px 0px 10px 0px;
	cursor: pointer;
	&:hover {
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;

const RightBox = styled.div`
	width: 5%;
	float: left;
	justify-content: center;
`;

const RemoveButton = styled.button`
	display: block;
	background-color: white;
	border-radius: 100%;
	font-size: 20px;
	width: 30px;
	height: 30px;
	cursor: pointer;
`;

const InterestedLayout = styled.ul`
	margin: 5rem 0;
	width: 100%;
	h1 {
		width: 100%;
		padding: 2rem 1rem 1rem 1rem;
		border-bottom: 1px solid #efefef;
	}
`;
