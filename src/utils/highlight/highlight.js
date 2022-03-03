export const highlight = (text, searchText) => {
	let hightlightText = text;

	searchText.split(' ').forEach((searchText) => {
		if (searchText) {
			let regExpCase = new RegExp(searchText, 'gi');
			hightlightText = hightlightText.replace(
				regExpCase,
				'<strong class="bold basic-blue">' + searchText + '</strong>',
			);
		}
	});
	return <div dangerouslySetInnerHTML={{ __html: hightlightText }}></div>;
};
