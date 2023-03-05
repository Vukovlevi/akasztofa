<script setup lang="ts">
const route = useRoute();
const dictionary = route.params.dictionary;
const { data, pending } = await useLazyFetch("/api/getdictionary", {
  method: "POST",
  body: {
    dictionary: dictionary,
  },
});
</script>

<template>
  <div class="pt-24">{{ pending ? "Töltés" : data }}</div>
</template>
