import axios from 'axios';

const destination_url = process.env.DESTINATION_URL;
const destination_authToken = process.env.DESTINATION_AUTH_TOKEN;

export const session = axios.create({
	baseURL: destination_url,
	headers: {
		Authorization: `Bearer ${destination_authToken}`,
	},
});
