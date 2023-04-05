import { session } from '../auth/login';

export default async () => {
	const { data } = await session.get('/collections');

	const collections = data.data
		.filter((item) => !item.collection.startsWith('directus_', 0))
		.filter((item) => item.schema != null)
		.map((i) => i.collection);
	return collections;
};
