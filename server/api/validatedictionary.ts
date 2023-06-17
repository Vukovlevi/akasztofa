import * as fs from "fs";
import * as fsPromises from "fs/promises";
import * as https from "https";
import {
  serverSupabaseServiceRole,
  serverSupabaseClient,
} from "#supabase/server";
import { Database } from "~~/types/supabase";

const runtimeConfig = useRuntimeConfig();

async function markAsInvalid(
  client: any,
  neededSplit: string[]
): Promise<void> {
  const { error } = await client
    .from("dictionaries")
    .update({ status: "invalid" })
    .eq("user_id", neededSplit[0])
    .eq("file_name", neededSplit[1]);
  if (error) console.log(error);
}

async function markAsValid(client: any, neededSplit: string[]): Promise<void> {
  const { error } = await client
    .from("dictionaries")
    .update({ status: "playable" })
    .eq("user_id", neededSplit[0])
    .eq("file_name", neededSplit[1]);
  if (error) console.log(error);
}

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event);
  return new Promise<boolean>(async (resolve, reject) => {
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
                await markAsInvalid(client, neededSplit);
                resolve(false);
                return;
              }
              const checked_words: string[] = [];
              array.forEach(async (word) => {
                if (checked_words.includes(word)) {
                  await markAsInvalid(client, neededSplit);
                  resolve(false);
                  return;
                }
                checked_words.push(word);
              });
              await markAsValid(client, neededSplit);
              resolve(true);
            });
        });
      }
    );
  });
});
