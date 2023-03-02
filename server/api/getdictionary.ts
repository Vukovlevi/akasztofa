import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import * as https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runtimeConfig = useRuntimeConfig();
let array: string[] = [];
export default defineEventHandler(async (event) => {
  fsPromises.unlink(__dirname + "/data.txt");
  const body = await readBody(event);
  const dictionary = body.dictionary;
  const neededSplit = dictionary.split("*");

  const file = fs.createWriteStream(__dirname + "/data.txt");

  try {
    https.get(
      `${runtimeConfig.public.supabaseStorage}/${neededSplit[0]}/${neededSplit[1]}`,
      (response) => {
        const stream = response.pipe(file);
  
        stream.on("finish", function () {
          fsPromises
            .readFile(__dirname + "/data.txt", "utf-8")
            .then((data: any) => {
              array = data.toString().split("\r\n");
            });
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
  return array;
});
