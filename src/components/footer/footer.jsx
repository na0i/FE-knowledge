import React from 'react';
import styled from 'styled-components';

/************************************* jsx *************************************/

const Footer = () => {
	return (
		<FooterLayout className="center">
			<Box className="column center"></Box>
		</FooterLayout>
	);
};

export default Footer;

/******************************** styled-components ********************************/

const Box = styled.div`
	width: 950px;
`;

const FooterLayout = styled.div`
	width: 100vw;
	padding: 28px 0;
	background: var(--color-white-footer);
`;
