import React from 'react';
import styled from 'styled-components';

/************************************* jsx *************************************/

const Footer = () => {
	return (
		<FooterLayout>
			<Box>
				<span>대표이사: 이형배</span>
				<Line />
				<span>본사 주소: 경기도 성남시 분당구 황새울로258번길 29, 티맥스수내타워 9-9층 티맥스소프트</span>
				<Line />
				<span>대표번호: 031-8018-1000</span>
			</Box>
			<Box>Copyright (c) 2022. TmaxSoft, All Rights Reserved.</Box>
		</FooterLayout>
	);
};

export default Footer;

/******************************** styled-components ********************************/

const Box = styled.span`
	width: 990px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 4px;
`;

const FooterLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: var(--color-black-text3);
	font-weight: 400;
	font-size: var(--font-size-14);
	margin-top: 60px;
	padding: 24px 0;
	background: var(--color-white-footer);
`;

const Line = styled.span`
	display: inline-block;
	width: 1px;
	height: 12px;
	margin: 0 6px;
	background-color: var(--color-gray-button);
`;
