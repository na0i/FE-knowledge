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
			<h1>
				관심있는 논문
				{/* <SortRadioButton /> */}
			</h1>

			{searchStore.interestedPapers?.map((paper) => (
				<PaperLayout key={paper.id}>
					<TitleBox>
						<p key={paper.id} onClick={() => navigate(`/search/paper?id=${paper.id}`)}>
							{paper.title}
						</p>
					</TitleBox>
					<RemoveButton onClick={() => searchStore.removeInterestedPaper(paper)}>
						<YellowStar />
						관심해제
					</RemoveButton>
				</PaperLayout>
			))}
		</InterestedLayout>
	);
});

export default InterestedPaper;

const InterestedLayout = styled.ul`
	width: 990px;
	margin: 80px 0;
	h1 {
		border-bottom: 1px solid #efefef;
		font-size: var(--font-size-20);
		font-weight: 700;
		padding-bottom: 20px;
	}
	font-family: 'Noto Sans KR', sans-serif;
`;

const PaperLayout = styled.div`
	width: 990px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 18px 0px;
`;

const TitleBox = styled.div`
	color: #000000;
	p {
		padding-bottom: 3px; // g, p, q, j가 잘리는 현상 때문에
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: var(--font-size-18);
		&:hover {
			cursor: pointer;
			text-decoration: 1px underline;
			text-underline-position: under;
		}
	}
`;

const RemoveButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
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
