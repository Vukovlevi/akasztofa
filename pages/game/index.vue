<script setup lang="ts">
import { Database } from "../../types/supabase";
const runtimeConfig = useRuntimeConfig();
const client = useSupabaseClient<Database>();

let dictionaries: any = null;
if (useState("dictionaries").value) {
  dictionaries = useState("dictionaries").value;
}

if (!dictionaries) {
  const { data, error } = await client
    .from("dictionaries")
    .select("*")
    .eq("status", "playable");
  if (error) {
    alert("Valami nem jó!");
  }
  if (data) {
    useState("dictionaries").value = data;
    dictionaries = data;
  }
}
</script>

<template>
  <div
    class="pt-24 md:pl-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto"
  >
    <NuxtLink
      v-for="dictionary in dictionaries"
      :to="'/game/' + dictionary.user_id + '*' + dictionary.file_name"
    >
      <Dictionary
        :username="dictionary.username"
        :filename="dictionary.file_name"
        mode="play"
      ></Dictionary>
    </NuxtLink>
  </div>
</template>
