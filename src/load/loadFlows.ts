import { session } from './loadInstance';

export default async (flows: any[]) => {
	const removeOps = flows.map((flow) => {
		delete flow.operations;
		return flow;
	});
	for (const flow of removeOps) {
		try {
			await session.post('flows', flow);
			console.log('Uploaded Flow');
		} catch (error) {
			console.log('Error uploading flow.', error.response.data.errors);
		}
	}
};
