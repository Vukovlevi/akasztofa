<script setup lang="ts">
import { Database } from "~~/types/supabase";

definePageMeta({
  middleware: ["auth", "username"],
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

let file: File;
function fileUpload(e: any) {
  file = e.target.files[0];
}

async function upload() {
  if (!file) return alert("There's no selected file!");
  const USER: any = useState("user").value;
  if (USER.dictionaries?.length >= 3) {
    return alert("You can't have more than 3 dictionaries!");
  }

  const { data, error } = await client.storage
    .from("dictionaries")
    .upload(`${user.value?.id}/${file.name}`, file);

  if (error) {
    alert("Upload has failed!");
    return;
  }

  const { data: validInfo } = await useFetch("/api/validatedictionary", {
    method: "POST",
    body: {
      dictionary: `${user.value?.id}*${file.name}`,
      username: USER.username,
      userId: user.value?.id,
      fileName: file.name,
    },
  });
  if (validInfo.value?.isValid) alert("Uploading is successful!");
  else alert("Your file didn't meat the requirements!");

  const { data: userDictionaries, error: userDictionariesError } = await client
    .from("users")
    .select("dictionaries")
    .eq("user_id", user.value?.id);
  if (userDictionariesError) {
    return alert("Saving into database failed!");
  }
  let dictionaries: number[];
  if (userDictionaries[0].dictionaries == null) {
    dictionaries = [];
  } else {
    dictionaries = userDictionaries[0].dictionaries;
  }
  dictionaries.push(validInfo.value?.dictionary[0].id);

  const { data: dataDBusers, error: errorDBusers } = await client
    .from("users")
    .update({
      dictionaries: dictionaries,
    })
    .eq("user_id", user.value?.id)
    .select();
  if (errorDBusers) {
    return alert("Saving into database failed!");
  }

  if (data) {
    const { data } = await client
      .from("users")
      .select("*")
      .eq("user_id", user.value?.id);

    if (data) {
      useState("user").value = data[0];
    }
  }
}
</script>

<template>
  <div
    class="w-screen sm:h-screen pt-20 flex flex-col justify-center items-center"
  >
    <div class="alert alert-info shadow-lg w-9/12 md:w-7/12 mb-10">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          To upload your own dictionary, you have to meet some requirements.
          Your file's extension must be a ".txt" and your file must have one
          word in each row. The words can't have spaces in them, before them or
          after them. The dictionary must have at least 30 unique words,
          otherwise it won't show up since it's not playable. If your file
          doesn't meet these requirements, than we can't guarantee the flawless
          operation of your dictionary.
        </span>
      </div>
    </div>
    <input
      type="file"
      accept="text/plain"
      class="file-input file-input-bordered file-input-info w-full max-w-xs"
      @change="fileUpload"
    />
    <button
      @click="upload"
      class="btn rounded-full text-white bg-orange-500 hover:bg-orange-500/50 mt-5"
    >
      Upload dictionary
    </button>
  </div>
</template>
