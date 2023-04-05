import { session } from './loadInstance';
import roles from '../source/roles/roles.json';

export default async () => {
	const cleanedUpRoles = roles.map((role) => {
		delete role.users;
		return role;
	});
	const adminRole = cleanedUpRoles.find((role) => role.name == 'Administrator');

	//Admin role isn't touched.
	const customRoles = cleanedUpRoles.filter((role) => role.name !== 'Administrator');
	try {
		const { data } = await session.post(`roles`, cleanedUpRoles);
	} catch (error) {
		// maybe the roles already exist
	}
	// const adminUpdate = await session.patch(`roles/${adminRole.id}`, adminRole);

	// console.log('Seeded Roles');
};
