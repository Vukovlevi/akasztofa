import * as fs from "fs";
import * as fsPromises from "fs/promises";
import * as https from "https";
import {
  serverSupabaseServiceRole,
  serverSupabaseClient,
} from "#supabase/server";
import { Database } from "~~/types/supabase";

type resp = {
  dictionary: any;
  isValid: boolean;
};

const runtimeConfig = useRuntimeConfig();

async function writeDb(
  client: any,
  status: string,
  username: string,
  userId: string,
  fileName: string
) {
  const { data: dataDBdictionaries, error: errorDBdictionaries } = await client
    .from("dictionaries")
    .insert({
      user_id: userId,
      username: username,
      file_name: fileName,
      categories: "általános",
      status: status,
    })
    .select();
  if (errorDBdictionaries) {
    console.log(errorDBdictionaries);
    return null;
  }
  return dataDBdictionaries;
}

export default defineEventHandler(async (event) => {
  serverSupabaseClient(event);
  const client = serverSupabaseServiceRole<Database>(event);
  return new Promise<resp>(async (resolve, reject) => {
    const body = await readBody(event);
    const dictionary = body.dictionary;
    const neededSplit = dictionary.split("*");
    let array: string[] = [];
    https.get(
      `${runtimeConfig.public.supabaseStorage}/${neededSplit[0]}/${neededSplit[1]}`,
      (response) => {
        const stream = fs.createWriteStream("/tmp/validate.txt");
        response.pipe(stream);
        stream.on("finish", () => {
          fsPromises
            .readFile("/tmp/validate.txt", "utf-8")
            .then(async (data: any) => {
              array = data.toString().split("\r\n");
              if (array.length < 30) {
                const dictionary = await writeDb(
                  client,
                  "invalid",
                  body.username,
                  body.userId,
                  body.fileName
                );
                resolve({ dictionary: dictionary, isValid: false });
                return;
              }
              const checked_words: string[] = [];
              array.forEach(async (word) => {
                if (checked_words.includes(word)) {
                  const dictionary = await writeDb(
                    client,
                    "invalid",
                    body.username,
                    body.userId,
                    body.fileName
                  );
                  resolve({ dictionary: dictionary, isValid: false });
                  return;
                }
                checked_words.push(word);
              });
              const dictionary = await writeDb(
                client,
                "playable",
                body.username,
                body.userId,
                body.fileName
              );
              resolve({ dictionary: dictionary, isValid: true });
            });
        });
      }
    );
  });
});
