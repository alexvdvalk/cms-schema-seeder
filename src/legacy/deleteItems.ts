import { session } from "../load/loadInstance";

export default async (itemName: string) => {
  let { data } = await session.get(itemName, {
    params: {
      limit: -1,
    },
  });
  const ids = data.data.map((i) => i.id);
  await session.delete(itemName, {
    data: ids,
  });
};
