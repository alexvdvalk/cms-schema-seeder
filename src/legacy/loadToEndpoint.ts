import { session } from "../load/loadInstance";

export default async (rawData: any[], endpoint: string) => {
  try {
    let { data } = await session.post(`/${endpoint}`, rawData);
    console.log(`Wrote ${rawData.length} to /${endpoint}`);
  } catch (err) {
    console.log(`Error loading ${endpoint}`, err.response.data.errors);
  }
};

//if endpoint is users, delete some fields
