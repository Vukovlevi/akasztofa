import { serverSupabaseServiceRole } from "#supabase/server";
import { Database } from "~~/types/supabase";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole<Database>(event);
  const { error } = await client.from("users").insert({
    user_id: body.user_id,
    username: body.username,
  });
  if (error) return "error";
  return null;
});
