import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyle';
import Main from './pages/mainPage/main';
import Search from './pages/mainPage/search';

function App() {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Routes>
				<Route exact path="/" element={<Main />} />
				<Route path="/second" element={<Search />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
