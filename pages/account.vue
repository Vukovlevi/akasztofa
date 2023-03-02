<script setup lang="ts">
import { Database } from "../types/supabase";

definePageMeta({
  middleware: ["auth"],
});

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

async function setUsername() {
  if (userRow.value.username) {
    username.value = userRow.value.username;
    return alert("Már van felhasználóneved!");
  }
  if (username.value === undefined) {
    return alert("A felhasználóneved nem lehet üres!");
  }
  try {
    const { data, error } = await client
      .from("users")
      .insert({
        user_id: user.value?.id || "",
        username: username.value || "",
      })
      .select();

    if (error) {
      return alert("A felhasználónév létezik!");
    }

    if (data) {
      useState("user").value = data[0];
      alert("Felhasználónév beállítása sikeres.");
      getUser();
    }
  } catch (error) {
    alert("A felhasználónév beállítása nem sikerült!");
  }
}

getUser();
</script>

<template>
  <div
    class="pt-20 w-10/12 h-screen flex flex-col justify-center mx-auto my-5 gap-3"
  >
    <div class="card grid grid-cols-2">
      <p class="text-xl text-center">Email cím:</p>
      <p class="text-xl text-center">{{ user?.email }}</p>
    </div>
    <div class="card grid grid-cols-2">
      <p class="text-xl text-center">Pontok:</p>
      <p class="text-xl text-center">{{ userRow.score }}</p>
    </div>
    <div class="card grid grid-cols-2 gap-2">
      <p class="text-xl flex items-center justify-center">Felhasználónév:</p>
      <input
        type="text"
        class="text-xl text-center bg-neutral input"
        placeholder="Nem állítottál be felhasználónevet"
        v-model="username"
      />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <p></p>
      <button
        @click="setUsername"
        class="btn bg-secondary-focus hover:bg-secondary"
      >
        Felhasználónév beállítása
      </button>
    </div>
    <div class="alert alert-info shadow-lg">
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
          >Itt be tudod állítani a saját felhasználóneved. Ha szeretnéd, hogy a
          pontjaid mentődjenek, vagy saját szótárat szeretnél a játékhoz adni,
          erre szükséged lesz! De vigyázz, ha egyszer beállítottad, azt nem
          változtathatod meg!</span
        >
      </div>
    </div>
    <!-- TODO: a potenciális dictionaryk megjelnítése -->
  </div>
</template>