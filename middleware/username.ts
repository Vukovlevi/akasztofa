import { Database } from "../types/supabase";

function returnWithError(error: string) {
  alert(error);
  return navigateTo("/account");
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (useState("user").value) return;

  const user = useSupabaseUser();
  const client = useSupabaseClient<Database>();
  try {
    const { data, error } = await client
      .from("users")
      .select("*")
      .eq("user_id", user.value?.id)
      .single();
    if (error) {
      console.log(error);
      return returnWithError(
        "Looks like you don't have a username, yet you try to upload a dictionary! Please set a username before uploading a dictionary!"
      );
    }
    useState("user").value = data;
  } catch (error) {
    return returnWithError("Something went wrong, please try again!");
  }
});
