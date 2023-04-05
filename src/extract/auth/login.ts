import axios from 'axios';

const source_url = process.env.SOURCE_URL;
const source_authToken = process.env.SOURCE_AUTH_TOKEN;

export const session = axios.create({
	baseURL: source_url,
	headers: {
		Authorization: `Bearer ${source_authToken}`,
	},
});
