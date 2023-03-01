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
        "Úgy néz ki nem állítottál be felhasználónevet! Ezt tedd meg mielőtt feltölteni próbálsz! Ha mégis van felhasználóneved, próbáld újra!"
      );
    }
    useState("user").value = data;
  } catch (error) {
    return returnWithError("Valami nem sikerült, próbáld újra!");
  }
});
