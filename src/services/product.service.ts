import http from '@/utils/http';
import { buildApiURL } from '@/utils/helpers';

export const fetchProducts = () => {
	return http.get(buildApiURL(`/products`)).then(({ data }) => {
		return data;
	});
};
