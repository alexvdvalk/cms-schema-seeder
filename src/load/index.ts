import dotenv from "dotenv";
dotenv.config();
import path from "path";
import fs from "fs";

import loadSchema from "./loadSchema";
import { session } from "./loadInstance";
import loadUsers from "./loadUsers";
import loadData from "./loadData";
import { loadPublicPermissions } from "./loadPublicPermissions";
import loadFiles from "./loadFiles";
import loadFlows from "./loadFlows";
import { loadOperations } from "./loadOperations";

// import loadRoles from './loadRoles';
// import loadUsers from './loadUsers';
// import fields from '../source/fields/fields.json';
// import loadFiles from './loadFiles';
// import loadFolders from './loadFolders';
// import loadData from './loadData';

// const getJsonFiles = () => {
// 	console.log(dir);
// 	let files = fs.readdirSync(dir);
// 	files = files.filter((file) => file.endsWith('.json') && file !== 'collections.json');
// 	return files;
// };

let dir = path.join(__dirname, "..", "source");

// let endpoints = [
//   "schema/snapshot",
//   "folders",
//   "operations",
//   "fields",
//   "users",
//   "roles",
//   "files",
//   "permissions",
//   "collections",
//   "flows",
//   "dashboards",
//   "panels",
// ];

export const readFile = (file: string): any[] => {
  const f = fs.readFileSync(`${dir}/${file}.json`, "utf8");
  const obj = JSON.parse(f);
  return obj;
};

export const loadToDestination = async (entity: string, rawData: any[]) => {
  for (const row of rawData) {
    try {
      const { data } = await session.post(entity, row);
    } catch (error) {
      console.log(
        `error with ${entity} - ${row.id}`,
        error.response.data.errors
      );
    }
  }
};

const loadRoles = async () => {
  let roles = await readFile("roles");
  roles = roles.map((role) => {
    delete role.users;
    return role;
  });
  loadToDestination("roles", roles);
};

const start = async () => {
  // I need to treat each entity individually, so cannot just loop through
  await loadSchema();
  await loadRoles();
  await loadUsers(readFile("users")); //Comes after roles
  await loadToDestination("folders", readFile("folders"));
  await loadFlows(readFile("flows"));
  await loadOperations(); // comes after flows
  await loadFiles();
  await loadData();
  await loadPublicPermissions();
};

start();
