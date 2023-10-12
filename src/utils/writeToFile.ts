import path from "path";
import fs from "fs";

const dir = path.join(__dirname, "..", "source");
export default async (fileName: string, data: any) => {
  const folders = fileName.split("/");
  let folderPath = folders.join("/");

  const fullPath = path.join(dir, folderPath);

  if (path && !fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
  try {
    await fs.promises.writeFile(
      `${dir}/${fileName}.json`,
      JSON.stringify(data, null, 2)
    );
    console.log(`Wrote ${fileName}`);
  } catch (error) {
    console.log("error writing to file", error);
  }
};
