import { session } from './loadInstance';
import schema from '../source/schema/snapshot.json';
import writeToFile from '../utils/writeToFile';

export default async () => {
	const { data } = await session.post('schema/diff?force', schema);
	if (!data.data) {
		console.log('No schema changes to apply');
		return;
	}
	await writeToFile('diff', data.data);
	try {
		const appliedSchema = await session.post('schema/apply', data.data);
		console.log('Schema Loaded');
	} catch (err) {
		console.log('Error Applying schema', err.response.data.errors);
	}
};
