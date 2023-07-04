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
  // const { data: preData } = await client
  //   .from("users")
  //   .select("*")
  //   .eq("user_id", user.value?.id);

  // if (preData) {
  //   console.warn(preData[0]);
  //   useState("user").value = preData[0];
  // }
  if (!file) return alert("Nincs kiválaszott fájl!");
  const USER: any = useState("user").value;
  if (USER.dictionaries?.length >= 3) {
    return alert("Csak 3 szótárad lehet!");
  }

  const { data, error } = await client.storage
    .from("dictionaries")
    .upload(`${user.value?.id}/${file.name}`, file);

  if (error) {
    alert("A fájl feltöltése sikertelen!");
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
  if (validInfo.value?.isValid) alert("A fájl feltöltése sikeres!");
  else alert("A fájl nem felelt meg a követelményeknek!");

  const { data: userDictionaries, error: userDictionariesError } = await client
    .from("users")
    .select("dictionaries")
    .eq("user_id", user.value?.id);
  if (userDictionariesError) {
    return alert("Az adatbázisba nem sikerült menteni!");
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
    return alert("Az adatbázisba mentés sikertelen!");
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
        <span
          >A saját szótár feltöltésének pár követlményt be kell tartania. A fájl
          neve nem tartalmazhat ékezetes karaktereket. A fájlnak ".txt"
          formátumban kell lennie, és soronként pontosan egy szót kell
          tartalmaznia! A szavak nem tartalmazhatnak szóközt se előttük, se
          bennük, se mögöttük. A szótárban legalább 30 különböző szónak kell
          lennie, különben nem lesz játszható. Ha a te fájlod nem felel meg ezen
          követelményeknek, nem garantálhatjuk a szótár szabályszerű
          működését!</span
        >
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
      Szótár feltöltése!
    </button>
  </div>
</template>
