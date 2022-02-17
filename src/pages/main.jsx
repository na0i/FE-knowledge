import React, { useEffect, useState } from 'react';
import RecentPaperList from 'src/components/recentPaperList';

const Main = () => {
	return (
		<div>
			<div>당신을 위한 맞춤형 학술정보서비스</div>
			<div>AI로 더 똑똑해진 서비스를 이용해보세요.</div>
			<input></input><button>검색</button>
			<RecentPaperList></RecentPaperList>
		</div>
	);
};

export default Main;
