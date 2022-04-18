import React from 'react';

import { SearchBoxComp } from 'src/components/search/search';

const MainSearchBox = () => {
	return (
		<div className="mt-32 mb-32">
			<SearchBoxComp selectWidth={125} font={16} width={640} height={52} />
		</div>
	);
};

export default MainSearchBox;
