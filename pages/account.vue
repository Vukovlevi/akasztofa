<script setup lang="ts">
import { Database } from "../types/supabase";

definePageMeta({
  middleware: ["auth"],
});

const auth = useSupabaseAuthClient();

type dict = {
  categories: string;
  created_at: string | null;
  file_name: string;
  id: number;
  user_id: string;
  username: string;
};

let USER: any = null;
if (useState("user")) {
  USER = useState("user").value;
}
const username = ref<string>();

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
let userRow = ref<{
  score: number;
  username: string;
}>({ score: 0, username: "" });
async function getUser() {
  if (USER) {
    userRow.value.username = USER.username;
    username.value = USER.username;
    userRow.value.score = USER.score;
    return;
  }
  try {
    const { data, error } = await client
      .from("users")
      .select("*")
      .eq("user_id", user.value?.id)
      .single();

    if (error) {
      userRow.value = { score: 0, username: "" };
      return;
    }

    if (data) {
      userRow.value = {
        score: data.score || 0,
        username: data.username || "",
      };
      username.value = data?.username;
      useState("user").value = data;
    }
  } catch (error) {
    userRow.value = { score: 0, username: "" };
    userRow.value.username = "";
  }
}

const { data: dictionaries, error } = await client
  .from("dictionaries")
  .select("*")
  .eq("user_id", user.value?.id);
if (error) {
  alert("Your dictionaries can't be displayed due to unknown error!");
}

async function deleteDictionary(dict: dict) {
  const { error: dictError } = await client
    .from("dictionaries")
    .delete()
    .eq("file_name", dict.file_name);
  if (dictError) return alert("Deletion has failed!");

  USER = useState("user").value;
  const index = USER.dictionaries.indexOf(dict.id);
  USER.dictionaries.splice(index, 1);
  const { error: arrayError } = await client
    .from("users")
    .update({ dictionaries: USER.dictionaries })
    .eq("user_id", user.value?.id);
  if (arrayError) return alert("Deletion has failed!");
  useState("user").value = USER;

  const { error: fileError } = await client.storage
    .from("dictionaries")
    .remove([`${user.value?.id}/${dict.file_name}`]);
  if (fileError) return alert("Deletion has failed!");

  alert("Dictionary successfully deleted!");
  location.reload();
}

async function logout() {
  try {
    await auth.auth.signOut();
    useState("user").value = null;
    navigateTo("/");
  } catch (error) {
    alert("Sign out has failed, please try again!");
  }
}

getUser();
</script>

<template>
  <div
    class="mt-36 md:mt-20 w-10/12 h-screen flex flex-col justify-center mx-auto my-5 gap-3"
  >
    <div class="card grid grid-cols-2">
      <p class="text-xl text-center">Email address:</p>
      <p class="text-xl text-center overflow-auto">{{ user?.email }}</p>
    </div>
    <div class="card grid grid-cols-2">
      <p class="text-xl text-center">Points:</p>
      <p class="text-xl text-center">{{ userRow.score }}</p>
    </div>
    <div class="card grid grid-cols-2 gap-2">
      <p class="text-xl flex items-center justify-center">Username:</p>
      <p class="text-xl text-center bg-neutral overflow-auto">
        {{ username }}
      </p>
    </div>
    <div
      v-if="dictionaries"
      class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto"
    >
      <Dictionary
        v-for="dictionary in dictionaries"
        :filename="dictionary.file_name"
        :username="dictionary.username"
        mode="delete"
        @delete="deleteDictionary(dictionary)"
      ></Dictionary>
    </div>
    <button @click="logout" class="md:hidden btn btn-outline btn-error">
      Sign out
    </button>
  </div>
</template>
