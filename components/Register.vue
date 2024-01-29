<script setup lang="ts">
import { Database } from "../types/supabase";
const auth = useSupabaseAuthClient();
const client = useSupabaseClient<Database>();

const form = reactive({
  email: "",
  username: "",
  password: "",
  passwordCheck: "",
});

const emit = defineEmits(["login"]);
function goToLogin() {
  emit("login");
}

async function register() {
  if (!form.email || !form.username || !form.password || !form.passwordCheck) {
    return alert("Fill in all field!");
  }

  if (form.password !== form.passwordCheck) {
    return alert("The given passwords don't match!");
  }
  let createdUser: any = null;
  try {
    const { data, error } = await auth.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      return alert("The given username is taken, please use another one!");
    }

    if (data) {
      alert(
        "We have sent an email to the given email address, please confirm it!"
      );
    }
    createdUser = data.user;
  } catch (error) {
    alert("Something went wrong, please try again!");
  }

  const { data } = useFetch("/api/createuser", {
    method: "POST",
    body: {
      user_id: createdUser?.id,
      username: form.username,
    },
  });
  if (data.value == "error") alert("Setting the username has failed!");
}
</script>

<template>
  <div class="h-screen flex flex-col gap-5 items-center justify-center">
    <button
      @click="goToLogin"
      class="btn rounded-full text-white bg-orange-500 hover:bg-orange-500/50 mb-5"
    >
      Do you already have an account? Log in!
    </button>
    <form
      @submit.prevent="register"
      class="form-control relative w-5/6 md:w-2/3 lg:w-1/3 max-w-xs border-2 border-base-content rounded-lg p-8 bg-neutral/50"
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
        placeholder="example@gmail.com"
        class="input input-bordered w-full max-w-xs"
        id="email"
        name="email"
        v-model="form.email"
      />
      <label class="label">
        <span class="label-text" for="username">Username</span>
      </label>
      <input
        type="text"
        placeholder="username"
        class="input input-bordered w-full max-w-xs"
        id="username"
        name="username"
        v-model="form.username"
      />
      <label class="label"
        ><span class="label-text" for="password">Password</span></label
      >
      <input
        type="password"
        placeholder="password"
        class="input input-bordered w-full max-w-xs"
        id="password"
        name="password"
        v-model="form.password"
      />
      <label class="label"
        ><span class="label-text" for="password-check"
          >Repeat password</span
        ></label
      >
      <input
        type="password"
        placeholder="repeat password"
        class="input input-bordered w-full max-w-xs"
        id="password-check"
        name="password-check"
        v-model="form.passwordCheck"
      />
      <button
        class="btn btn-outline hover:bg-blue-700 border-blue-700 hover:border-blue-700 text-blue-700 hover:text-white mt-5"
        type="submit"
      >
        Register
      </button>
    </form>
  </div>
</template>
