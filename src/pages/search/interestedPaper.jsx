import React, { useEffect } from 'react';
import styled from 'styled-components';
import rootStore from 'src/stores/rootStore';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { SortRadioButton } from 'src/components/button/sortRadioButton';
import { ReactComponent as YellowStar } from 'src/assets/star-yellow.svg';

const InterestedPaper = observer(() => {
	const navigate = useNavigate();
	const { searchStore } = rootStore();

	useEffect(() => searchStore.getInterestedPapers(), []);

	return (
		<InterestedLayout>
			<div className="justify-between">
				<h1 className="f-24 justify-between title-font">
					관심있는 논문
					{/* <SortRadioButton sortFatchFunction={} /> */}
					<SortRadioButton />
				</h1>
			</div>

			<div className="mt-32">
				{searchStore.interestedPapers?.map((paper) => (
					<div key={paper.id}>
						<LeftBox>
							<div key={paper.id} onClick={() => navigate(`/search/paper?id=${paper.id}`)}>
								{paper.title}
							</div>
						</LeftBox>
						<RightBox>
							<RemoveButton className="center" onClick={() => searchStore.removeInterestedPaper(paper)}>
								<YellowStar />
								관심해제
							</RemoveButton>
						</RightBox>
					</div>
				))}
			</div>
		</InterestedLayout>
	);
});

export default InterestedPaper;

const LeftBox = styled.div`
	color: #55a3d7;
	width: 867px;
	float: left;
	margin: 20px 0px 10px 0px;
	cursor: pointer;
	&:hover {
		text-decoration: 1px underline;
		text-underline-position: under;
	}
`;

const RightBox = styled.div`
	float: left;
	margin: 10px 0px 10px 0px;

	justify-content: center;
`;

const RemoveButton = styled.button`
	width: 91px;
	height: 32px;
	cursor: pointer;
	font-size: var(--font-size-12);
	color: var(--color-black-text3);
	background: #ffffff;
	border: 1px solid var(--color-gray-button);
	box-sizing: border-box;
	border-radius: 4px;
	&:hover {
		border: 1px solid var(--color-gray-button-hover);
		background: var(--color-white-hover);
	}
	svg {
		margin-right: 4px;
	}
`;

const InterestedLayout = styled.ul`
	margin: 5rem 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 990px;
	h1 {
		width: 100%;
		padding: 2rem 1rem 1rem 1rem;
		border-bottom: 1px solid #efefef;
	}
	font-family: 'Noto Sans KR', sans-serif;
`;
