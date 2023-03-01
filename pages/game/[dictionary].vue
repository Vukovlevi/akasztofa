<script setup lang="ts">
const route = useRoute();
const dictionary = route.params.dictionary;
const { data, refresh } = await useFetch<string[]>("/api/getdictionary", {
  method: "POST",
  body: {
    dictionary: dictionary,
  },
});

setTimeout(() => {
  refresh();
}, 1000);
</script>

<template>
  <div class="pt-24">{{ data }}</div>
</template>
