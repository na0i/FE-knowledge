import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyle';
import { Main, SearchList } from '../pages';
import '../App.css';

function App() {
	return (
		// 왜 index.js가 아니라 app.js에 합쳐서 뒀는지 여쭤보자!
		<BrowserRouter>
			<GlobalStyles />
			<Routes>
				<Route exact path="/" element={<Main />} />
				<Route path="/search/:searchText" element={<SearchList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
