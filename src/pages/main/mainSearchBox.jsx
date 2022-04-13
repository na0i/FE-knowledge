import React from 'react';

import { SearchBoxComp } from 'src/components/search';

const MainSearchBox = () => {
	return (
		<div className="mt-32 mb-32">
			<SearchBoxComp font={16} width={640} height={52} />
		</div>
	);
};

export default MainSearchBox;
