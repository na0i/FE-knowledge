import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyle';
import * as Pages from 'src/pages';
import styled from 'styled-components';

function App() {
	return (
		<FontDefault>
			<BrowserRouter>
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
