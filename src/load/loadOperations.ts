import { readFile } from ".";
import deleteItems from "../legacy/deleteItems";
import { session } from "./loadInstance";

export const loadOperations = async () => {
  await deleteItems("operations");
  const ops = readFile("operations");
  const opsIds = ops.map((i) => {
    const del = { ...i };
    delete del.resolve;
    delete del.reject;
    return del;
  });
  try {
    await session.post("operations", opsIds);
    for (const op of ops) {
      let pl = {
        resolve: op.resolve,
        reject: op.reject,
      };
      console.log(`updateing ${op.id} with`, pl);
      await session.patch(`operations/${op.id}`, pl);
    }
  } catch (error) {
    console.log(error.response.data.errors);
  }
};
