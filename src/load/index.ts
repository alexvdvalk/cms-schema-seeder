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

const dir = path.join(__dirname, "..", "source");

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

export const loadSettings = async (settingsObj: any) => {
  const { data } = await session.patch("settings", settingsObj);
};

const loadRoles = async () => {
  let roles = await readFile("roles");
  roles = roles.map((role) => {
    delete role.users;
    return role;
  });
  await loadToDestination("roles", roles);
};

const loadDashboards = async () => {
  let dashboards = readFile("dashboards");
  let filteredDashboards = dashboards.map((dash) => {
    let newDash = { ...dash };
    delete newDash.panels;
    return newDash;
  });
  await loadToDestination("dashboards", filteredDashboards);
};

const start = async () => {
  // I need to treat each entity individually, so cannot just loop through
  await loadSchema();
  await loadRoles();
  await loadToDestination("folders", readFile("folders"));
  // await loadToDestination("dashboards", readFile("dashboards"));
  await loadDashboards();
  await loadToDestination("panels", readFile("panels")); //Comes after dashboards
  await loadFiles(); //comes after folders
  await loadUsers(readFile("users")); //Comes after roles, files
  await loadFlows(readFile("flows"));
  await loadOperations(); // comes after flows
  await loadData();
  await loadToDestination("presets", readFile("presets"));
  await loadSettings(readFile("settings"));
  await loadPublicPermissions();
};

start();
