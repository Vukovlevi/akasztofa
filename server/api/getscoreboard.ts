import { serverSupabaseServiceRole } from "#supabase/server";
import { Database } from "~~/types/supabase";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event);

  const { data, error } = await client
    .from("users")
    .select("username, score")
    .order("score", { ascending: false })
    .limit(50);

  if (error) {
    return data;
  }

  if (data) {
    return data;
  }
});
