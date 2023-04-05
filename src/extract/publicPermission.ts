import { session } from './auth/login';
import writeToFile from '../utils/writeToFile';

/**
 * [default query an endpoint and write the result to file]
 */
export default async () => {
	const { data } = await session.get(`permissions`, {
		params: {
			limit: '-1',
			'filter[role][_null]': true,
		},
	});
	writeToFile(`publicPermissions`, data.data);
	return;
};
