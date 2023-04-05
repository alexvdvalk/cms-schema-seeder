import { session } from "../load/loadInstance";

export default async () => {
  // const collections = await getCollections();
  // await removeCollections(collections);

  // const fields = await getFields();
  // deleteFields(fields);

  // Delete 'collection folders'
  const cols = await getCollections();
  await removeCollections(cols);
};

const deleteFields = async (fields: Field[]) => {
  for (const field of fields) {
    if (!field.collection.startsWith("directus_")) {
      try {
        await session.delete(`fields/${field.collection}/${field.field}`);
        console.log(`Deleted ${field.collection}/${field.field}`);
      } catch (error) {
        console.log(`Error deleting ${field.collection}/${field.field}`);
      }
    }
  }
};

const removeCollections = async (collections: string[]) => {
  // const collectionsToRetry: string[] = [];
  for (const collection of collections) {
    try {
      await session.delete(`collections/${collection}`);
      console.log(`Removed collection ${collection}`);
    } catch (error) {
      console.log(`Error removing ${collection}. Adding to Retry`);
      // collectionsToRetry.push(collection);
    }
  }
  // console.log(`Attempting Retries`);
  // await removeCollections(collectionsToRetry);
};

const getCollections = async () => {
  const { data } = await session.get("collections");
  const collections: string[] = data.data
    .filter((item) => !item.collection.startsWith("directus_", 0))
    .filter((item) => item.schema != null)
    .map((i) => i.collection);
  return collections;
};

const getFields = async () => {
  const { data } = await session.get<{ data: Field[] }>("fields");
  return data.data;
};

interface Field {
  collection: string;
  field: string;
  type: string;
  schema: any;
  meta: any;
}
