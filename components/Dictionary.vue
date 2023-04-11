<script setup lang="ts">
defineProps(["username", "filename", "mode"]);
const emits = defineEmits(["delete"]);
</script>
<template>
  <div class="card bg-primary text-primary-content">
    <div class="card-body">
      <h2 class="card-title text-warning">{{ filename }}</h2>
      <p class="text-secondary">{{ username }}</p>
      <div class="card-actions justify-end">
        <button v-if="mode == 'play'" class="btn">Játsz most!</button>
        <button
          v-if="mode == 'delete'"
          title="Törlés"
          class="text-red-800"
          @click="emits('delete')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="red"
          >
            <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
          Törlés
        </button>
      </div>
    </div>
  </div>
</template>
