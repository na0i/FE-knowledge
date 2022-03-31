import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyle';
import * as Pages from 'src/pages';
import styled from 'styled-components';

function App() {
	return (
		<FontDefault>
			<BrowserRouter>
				{/* 글로벌 스타일을 컴포넌트로 사용하는 이유는? */}
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<Pages.Home />} />
				</Routes>
			</BrowserRouter>
		</FontDefault>
	);
}

export default App;

const FontDefault = styled.div`
	font-family: 'Roboto', 'Noto Sans kr';
`;
