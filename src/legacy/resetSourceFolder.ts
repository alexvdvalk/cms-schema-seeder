import path from 'path';
import rimraf from 'rimraf';
import fs from 'fs';

const dir = path.join(__dirname, '..', 'source');
const collectionsDir = path.join(__dirname, '..', 'source', 'collectionsData');
const rolesDir = path.join(__dirname, '..', 'source', 'roles');
const schemaDir = path.join(__dirname, '..', 'source', 'schema');
const assetDir = path.join(__dirname, '..', 'source', 'assets');

export default async () => {
	await rimraf(dir);
	await fs.promises.mkdir(dir);
	await fs.promises.mkdir(assetDir);
	await fs.promises.mkdir(schemaDir);
	await fs.promises.mkdir(collectionsDir);
	await fs.promises.mkdir(rolesDir);
	console.log('Reset Source Folder');
};
