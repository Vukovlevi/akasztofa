<script setup lang="ts">
definePageMeta({
  middleware: ["getusername"],
});

const scores = ref();

const { data, error } = await useFetch("/api/getscoreboard");

if (error.value) {
  alert("There's an error, please refresh the page!");
}

if (!data.value) {
  alert("There's an error, please refresh the page!");
}

scores.value = data.value;
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <table class="table">
      <thead>
        <tr>
          <th class="bg-secondary text-black">Rank</th>
          <th class="bg-secondary text-black">Username</th>
          <th class="bg-secondary text-black">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, i) in scores" :class="'bg-secondary place-' + i">
          <th class="text-center bg-transparent text-black">
            {{ i + 1 + "." }}
          </th>
          <td class="text-center bg-transparent text-black">
            {{ score.username }}
          </td>
          <td class="text-center bg-transparent text-black">
            {{ score.score }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.place-0 {
  background-color: gold;
}

.place-1 {
  background-color: silver;
}

.place-2 {
  background-color: #cd7f32;
}
</style>
