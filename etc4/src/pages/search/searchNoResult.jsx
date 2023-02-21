import React from 'react';
import styled from 'styled-components';
import noResult from '../../assets/noResult.svg';
import { UseLocationQuery } from 'src/utils/useLocation';

export const SearchNoResult = () => {
	const search = UseLocationQuery();

	return (
		<Wrapper>
			<img src={noResult} alt=""></img>
			<Title>
				<PointColor>{"'" + search.q + "'"}</PointColor>에 대한 검색 결과는 모두 <PointColor>0건</PointColor>이
				조회되었습니다.
			</Title>
			<Desc>
				<div>검색결과를 찾을 수 없습니다.</div>
				<div>단어의 철자가 정확한 지 확인하세요.</div>
				<div>보다 일반적인 단어로 검색해보세요.</div>
			</Desc>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 990px;
	height: 50vh;
`;

const Title = styled.div`
	margin: 20px 0px 16px 0px;
	font-size: var(--font-size-18);
`;

const PointColor = styled.span`
	color: var(--color-orange-point);
	font-weight: 700;
`;

const Desc = styled.div`
	font-size: var(--font-size-14);
	color: var(--color-black-text4);
	text-align: center;
	line-height: 20.27px;
`;
