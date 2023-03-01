export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (user.value) {
    alert("Ki kell jelentkezned a fiókváltáshoz!");
    return navigateTo("/");
  }
});
