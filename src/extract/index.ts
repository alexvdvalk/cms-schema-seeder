import { AxiosInstance } from "axios";
// import login from './auth/login';

import dotenv from "dotenv";
dotenv.config();

import extractData from "./collections/extractData";
import { downloadAllFiles } from "./assets";
import extractPublicPermissions from "./publicPermission";
import extractFromEndpoint from "./extractFromEndpoint";

let endpoints = [
  "schema/snapshot",
  "folders",
  "operations",
  "fields",
  "users",
  "roles",
  "files",
  "permissions",
  "collections",
  "flows",
  "dashboards",
  "panels",
  "presets",
  "settings",
];

const start = async () => {
  for (const entity of endpoints) {
    await extractFromEndpoint(entity);
  }
  await extractPublicPermissions();
  await extractData();
  await downloadAllFiles();
};

start();
// getAssetList();

// Delete everything in /src/source
// Extract User roles done
// Extract Users
// Extract all files to JSON
// Extract raw files
// Extract All made collection names
// Handle error around 'folder' collections
// Extract all data to json files

// Delete all collections on DESTINATION
// Apply Schema
// Load User Roles
// Load users
// Load all file attachments
