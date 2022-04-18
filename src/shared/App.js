import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyle';
import * as Pages from '../pages';
import '../App.css';
import Footer from 'src/components/footer/footer';

function App() {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<Pages.Main />} />
				<Route path="/search" element={<Pages.SearchList />} />
				<Route path="/search/paper" element={<Pages.Paper />} />
				<Route path="/subjectFilter" element={<Pages.SubjectFilter />} />
				<Route path="/conceptFilter" element={<Pages.ConceptFilter />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
