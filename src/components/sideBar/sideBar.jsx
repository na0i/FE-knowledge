import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

export const SideBar = observer(({ appList }) => {
	return (
		<>
			<FixedBar>
				{appList?.map((app) => (
					<ButtonLayer key={app.key}>{app.children}</ButtonLayer>
				))}
			</FixedBar>
		</>
	);
});

const FixedBar = styled.div`
	width: 200px;
	min-height: 100%;
	position: fixed;
	right: 0;
	border-left: 1px solid #e7e7e7;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ButtonLayer = styled.div`
	padding-top: 15px;
	position: relative;
`;

const DropdownLayer = styled.div`
	position: absolute;
	top: 200px;
`;
