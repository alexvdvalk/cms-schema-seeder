import { session } from '../auth/login';
import fs from 'fs';
import path from 'path';

export default async (file: any) => {
	const response = await session.get(`assets/${file.id}`, {
		responseType: 'stream',
	});

	//Create assets folder if it doesnt exist
	const fullPath = path.join(__dirname, '..', '..', 'source', 'assets');
	if (path && !fs.existsSync(fullPath)) {
		fs.mkdirSync(fullPath);
	}
	const WritePath = path.resolve(__dirname, '..', '..', 'source', 'assets', file.filename_disk);
	const writer = fs.createWriteStream(WritePath);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', () => {
			console.log(`Wrote ${file.filename_disk}`);
			resolve(null);
		});
		writer.on('error', reject);
	});
};
