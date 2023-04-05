import { session } from "./loadInstance";
import assets from "../source/files.json";
import FormData from "form-data";

import fs from "fs";
import path from "path";

export default async () => {
  for (const asset of assets) {
    const fileName = asset.filename_disk;
    const assetPath = path.resolve(
      __dirname,
      "..",
      "source",
      "assets",
      fileName
    );
    const fileStream = fs.createReadStream(assetPath);

    const form = new FormData();
    form.append("id", asset.id);
    form.append("file", fileStream);
    // if (asset.title) form.append('title', asset.title);
    // if (asset.description) form.append('description', asset.description);
    // if (asset.folder) form.append('folder', asset.folder);
    // form.append;

    try {
      let { data } = await session.post(`files`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await session.patch(`files/${asset.id}`, {
        title: asset.title,
        description: asset.description,
        folder: asset.folder,
      });
      console.log(`Uploaded ${asset.id}`);
    } catch (err) {
      console.log(err.response.data.errors);
    }
  }
  // console.log('file', file);
};
