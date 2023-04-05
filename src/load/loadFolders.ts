import { session } from './loadInstance';
import folders from '../source/folders/folders.json';

export default async () => {
	try {
		let { data } = await session.post('/folders', folders);
		console.log('Folder creation', data);
	} catch (err) {
		console.log('Error loading Folders', err.response.data.errors);
	}
};
