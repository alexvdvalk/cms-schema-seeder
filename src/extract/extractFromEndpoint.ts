import { session } from './auth/login';
import writeToFile from '../utils/writeToFile';

/**
 * [default query an endpoint and write the result to file]
 */
export default async (path: string) => {
	const { data } = await session.get(`/${path}`, {
		params: {
			limit: '-1',
		},
	});
	writeToFile(`${path}`, data.data);
	return;
};
