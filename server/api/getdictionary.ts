import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import * as https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  try {
    await fsPromises.unlink(__dirname + "/data.txt");
  } catch (err) {
    console.error(err);
  }
  return new Promise<string[]>(async (resolve, reject) => {
    let array: string[] = [];
    const body = await readBody(event);
    const dictionary = body.dictionary;
    const neededSplit = dictionary.split("*");

    const file = fs.createWriteStream(__dirname + "/data.txt");

    https.get(
      `${runtimeConfig.public.supabaseStorage}/${neededSplit[0]}/${neededSplit[1]}`,
      (response) => {
        const stream = response.pipe(file);

        stream.on("finish", () => {
          fsPromises
            .readFile(__dirname + "/data.txt", "utf-8")
            .then((data: any) => {
              array = data.toString().split("\r\n");
              resolve(array);
            });
        });
      }
    );
  });
});
