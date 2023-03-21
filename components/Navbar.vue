<script setup lang="ts">
const user = useSupabaseUser();
const auth = useSupabaseAuthClient();

async function logout() {
  try {
    await auth.auth.signOut();
    useState("user").value = null;
    navigateTo("/");
  } catch (error) {
    alert("Kijelentkezés sikertelen, próbáld újra!");
  }
}
</script>

<template>
  <div class="navbar fixed top-0 bg-primary opacity-90 text-info-content z-10">
    <div class="flex-1">
      <NuxtLink
        to="/"
        class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-ghost hover:bg-primary normal-case text-xl"
        >Akasztófa</NuxtLink
      >
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1 items-center">
        <li>
          <NuxtLink
            to="/game"
            class="btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-info hover:text-white"
            >Játék!</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/upload"
            class="btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-info hover:text-white"
            >Feltöltés</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/account"
            class="btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-info hover:text-white"
            title="Profil"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </NuxtLink>
        </li>
        <li v-if="user">
          <button @click="logout" class="btn btn-outline btn-error">
            Kijelentkezés
          </button>
        </li>
        <li v-else>
          <NuxtLink
            to="/auth"
            class="btn btn-outline text-blue-700 hover:text-white hover:bg-blue-700 hover:border-blue-700"
          >
            Bejelentkezés
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
