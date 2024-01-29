export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (user.value) {
    alert("You must sign out to change accounts!");
    return navigateTo("/");
  }
});
