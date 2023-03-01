<script setup lang="ts">
const auth = useSupabaseAuthClient();

const form = reactive({
  email: "",
  password: "",
  passwordCheck: "",
});

const emit = defineEmits(["login"]);
function goToLogin() {
  emit("login");
}

async function register() {
  if (!form.email || !form.password || !form.passwordCheck) {
    return alert("Töltse ki az összes mezőt!");
  }

  if (form.password !== form.passwordCheck) {
    return alert("A megadott jelszavak nem egyeznek!");
  }

  try {
    const { data, error } = await auth.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      return alert(
        "A megadott felhasználónév foglalt, kérjük használjon másikat!"
      );
    }

    if (data) {
      alert("A megadott email címre levelet küldtünk. Kérjük igazolja vissza!");
    }
  } catch (error) {
    alert("Valami nem stimmel, próbáld újra!");
  }
}
</script>

<template>
  <div class="h-screen flex flex-col gap-5 items-center justify-center">
    <button
      @click="goToLogin"
      class="btn rounded-full text-white bg-orange-500 hover:bg-orange-500/50 mb-5"
    >
      Már van fiókod? Jelentkezz be!
    </button>
    <form
      @submit.prevent="register"
      class="form-control relative w-1/3 max-w-xs border-2 border-base-content rounded-lg p-8 bg-neutral/50"
    >
      <div
        class="absolute top-0 left-0 translate-y-[-50%] w-full flex justify-center bg-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-16 h-16 rounded-full border-2 border-base-content p-2 bg-base-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </div>
      <label class="label">
        <span class="label-text" for="email">Email</span>
      </label>
      <input
        type="email"
        placeholder="pelda@gmail.com"
        class="input input-bordered w-full max-w-xs"
        id="email"
        name="email"
        v-model="form.email"
      />
      <label class="label"
        ><span class="label-text" for="password">Jelszó</span></label
      >
      <input
        type="password"
        placeholder="Jelszó"
        class="input input-bordered w-full max-w-xs"
        id="password"
        name="password"
        v-model="form.password"
      />
      <label class="label"
        ><span class="label-text" for="password-check"
          >Jelszó mégegyszer</span
        ></label
      >
      <input
        type="password"
        placeholder="Jelszó mégegyszer"
        class="input input-bordered w-full max-w-xs"
        id="password-check"
        name="password-check"
        v-model="form.passwordCheck"
      />
      <button
        class="btn btn-outline hover:bg-blue-700 border-blue-700 hover:border-blue-700 text-blue-700 hover:text-white mt-5"
        type="submit"
      >
        Regisztáció
      </button>
    </form>
  </div>
</template>
