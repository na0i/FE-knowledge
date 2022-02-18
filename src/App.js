import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyle';
import Main from './pages/main';

function App() {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
