import { session } from '../auth/login';

export default async () => {
	const { data } = await session.get(`/files`, {
		params: {
			limit: '-1',
		},
	});
	return data.data;
};
