import { loadToDestination, readFile } from '.';
import { session } from './loadInstance';

export const loadPublicPermissions = async () => {
	await removeallPublicPermissions();
	let roles = readFile('publicPermissions');
	await loadToDestination('permissions', roles);
};

const removeallPublicPermissions = async () => {
	const { data: data } = await session.get('permissions?filter[role][_null]=true&limit=-1');
	const ids = data.data.map((i) => i.id);
	if (!ids) return;
	await session.delete('permissions', {
		data: ids,
	});
};
