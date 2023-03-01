<script setup lang="ts">
definePageMeta({
  middleware: ["login"],
});

const authState = ref("login");

function goToRegister() {
  authState.value = "register";
}
function goToLogin() {
  authState.value = "login";
}
</script>
<template>
  <div class="pt-12">
    <Login v-if="authState === 'login'" @register="goToRegister"></Login>
    <Register v-else @login="goToLogin"></Register>
  </div>
</template>
