<script setup lang="ts">
const route = useRoute();
const dictionary = route.params.dictionary;
const { data, pending } = await useLazyFetch("/api/getdictionary", {
  method: "POST",
  body: {
    dictionary: dictionary,
  },
});

function generateRandom(min: number, max: number) {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

const word = ref("");
if (data.value && word.value == "") {
  const index = generateRandom(0, data.value.length);
  word.value = data.value[index];
}
</script>

<template>
  <div class="pt-24 flex flex-col justify-end h-screen gap-4">
    <div class="mx-auto flex">
      <p
        v-for="keyletter in word.length"
        class="border-b-4 mr-4 text-3xl w-12 text-center"
      >
        {{ word[keyletter - 1].toUpperCase() }}
      </p>
    </div>
    <div class="letter-container grid grid-cols-11 w-3/5 mx-auto mb-6 gap-2">
      <button class="letter">A</button>
      <button class="letter">Á</button>
      <button class="letter">B</button>
      <button class="letter">C</button>
      <button class="letter">CS</button>
      <button class="letter">D</button>
      <button class="letter">DZ</button>
      <button class="letter">DZS</button>
      <button class="letter">E</button>
      <button class="letter">É</button>
      <button class="letter">F</button>
      <button class="letter">G</button>
      <button class="letter">GY</button>
      <button class="letter">H</button>
      <button class="letter">I</button>
      <button class="letter">Í</button>
      <button class="letter">J</button>
      <button class="letter">K</button>
      <button class="letter">L</button>
      <button class="letter">LY</button>
      <button class="letter">M</button>
      <button class="letter">N</button>
      <button class="letter">NY</button>
      <button class="letter">O</button>
      <button class="letter">Ó</button>
      <button class="letter">Ö</button>
      <button class="letter">Ő</button>
      <button class="letter">P</button>
      <button class="letter">Q</button>
      <button class="letter">R</button>
      <button class="letter">S</button>
      <button class="letter">SZ</button>
      <button class="letter">T</button>
      <button class="letter">TY</button>
      <button class="letter">U</button>
      <button class="letter">Ú</button>
      <button class="letter">Ü</button>
      <button class="letter">Ű</button>
      <button class="letter">V</button>
      <button class="letter">W</button>
      <button class="letter">X</button>
      <button class="letter">Y</button>
      <button class="letter">Z</button>
      <button class="letter">ZS</button>
    </div>
  </div>
</template>

<style scoped>
.letter {
  --color-white: rgba(255, 255, 255, 0.8);
  --color-grey: rgba(255, 255, 255, 0.2);
  font-size: 2rem;
  color: var(--color-white);
  border: 1px solid var(--color-white);
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  aspect-ratio: 1/1;
  outline: 0;
}
.letter:focus-visible,
.letter:hover {
  cursor: pointer;
  opacity: 0.5;
}
@media (max-width: 1600px) {
  .letter-container {
    width: 75%;
  }
}
@media (max-width: 1280px) {
  .letter {
    width: 4rem;
  }
}
@media (max-width: 950px) {
  .letter-container {
    width: 90%;
  }
  .letter {
    width: 4rem;
    font-size: 1.5rem;
  }
}
@media (max-width: 768px) {
  .letter {
    width: 2.5rem;
    font-size: 1rem;
  }
}
@media (max-width: 550px) {
  .letter-container {
    gap: 0 !important;
    width: 95% !important;
  }
  .letter {
    width: 2rem;
    font-size: 0.75rem;
  }
}
@media (max-width: 380px) {
  .letter {
    width: 1.5rem;
  }
}
</style>
