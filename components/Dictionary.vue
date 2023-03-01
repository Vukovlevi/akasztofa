<script setup lang="ts">
defineProps(["username", "filename"]);
</script>
<template>
  <div class="card bg-primary text-primary-content">
    <div class="card-body">
      <h2 class="card-title text-warning">{{ filename }}</h2>
      <p class="text-secondary">{{ username }}</p>
      <div class="card-actions justify-end">
        <button class="btn">Játsz most!</button>
      </div>
    </div>
  </div>
</template>
