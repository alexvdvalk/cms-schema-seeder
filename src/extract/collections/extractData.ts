import { session } from '../auth/login';
import writeToFile from '../../utils/writeToFile';
import getCollections from './getCollections';

export default async () => {
	const collections = await getCollections();
	for (const collection of collections) {
		await getDataFromCollection(collection);
	}
};

const getDataFromCollection = async (collection: string) => {
	try {
		const { data } = await session.get(`items/${collection}`);
		writeToFile(`collectionsData/${collection}.json`, data.data);
	} catch (error) {
		console.log(`error getting items from ${collection}`);
		// Errors are thrown for 'folder' collections
	}
};
