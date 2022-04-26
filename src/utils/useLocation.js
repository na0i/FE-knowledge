import { useLocation } from 'react-router-dom';
import qs from 'qs';

//url query parse
export const UseLocationQuery = () => {
	const { search } = useLocation();
	return qs.parse(search.split('?')[1]);
};
