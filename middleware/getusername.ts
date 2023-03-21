// gets the username if he is logged in
import { Database } from "../types/supabase";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient<Database>();
  if (!user.value) return;
  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("user_id", user.value?.id)
    .single();
  if (error) return;
  useState("user").value = data;
});
