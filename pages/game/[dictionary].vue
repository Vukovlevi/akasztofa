<script setup lang="ts">
const route = useRoute();
const dictionary = route.params.dictionary;
const { data } = await useLazyFetch("/api/getdictionary", {
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
const guesses = ref<string[]>([]);
if (data.value && word.value == "") {
  const index = generateRandom(0, data.value.length);
  word.value = data.value[index];
}

function addGuess(letter: string) {
  if (!letter.match(/^[a-záéíóöőúüű]$/)) return;
  if (!guesses.value.includes(letter)) guesses.value.push(letter);
}
</script>

<template>
  <div class="pt-24 flex flex-col justify-end h-screen gap-4">
    <div class="mx-auto flex">
      <p
        v-for="keyletter in word.length"
        class="border-b-4 mr-4 text-3xl w-12 text-center"
      >
        <span
          :class="
            guesses.includes(word[keyletter - 1]) ? 'visible' : 'invisible'
          "
          >{{ word[keyletter - 1].toUpperCase() }}</span
        >
      </p>
    </div>
    <div class="letter-container grid grid-cols-11 w-3/5 mx-auto mb-6 gap-2">
      <button class="letter" @click="addGuess('a')">A</button>
      <button class="letter" @click="addGuess('á')">Á</button>
      <button class="letter" @click="addGuess('b')">B</button>
      <button class="letter" @click="addGuess('c')">C</button>
      <button class="letter" @click="addGuess('cs')">CS</button>
      <button class="letter" @click="addGuess('d')">D</button>
      <button class="letter" @click="addGuess('dz')">DZ</button>
      <button class="letter" @click="addGuess('dzs')">DZS</button>
      <button class="letter" @click="addGuess('e')">E</button>
      <button class="letter" @click="addGuess('é')">É</button>
      <button class="letter" @click="addGuess('f')">F</button>
      <button class="letter" @click="addGuess('g')">G</button>
      <button class="letter" @click="addGuess('gy')">GY</button>
      <button class="letter" @click="addGuess('h')">H</button>
      <button class="letter" @click="addGuess('i')">I</button>
      <button class="letter" @click="addGuess('í')">Í</button>
      <button class="letter" @click="addGuess('j')">J</button>
      <button class="letter" @click="addGuess('k')">K</button>
      <button class="letter" @click="addGuess('l')">L</button>
      <button class="letter" @click="addGuess('ly')">LY</button>
      <button class="letter" @click="addGuess('m')">M</button>
      <button class="letter" @click="addGuess('n')">N</button>
      <button class="letter" @click="addGuess('ny')">NY</button>
      <button class="letter" @click="addGuess('o')">O</button>
      <button class="letter" @click="addGuess('ó')">Ó</button>
      <button class="letter" @click="addGuess('ö')">Ö</button>
      <button class="letter" @click="addGuess('ő')">Ő</button>
      <button class="letter" @click="addGuess('p')">P</button>
      <button class="letter" @click="addGuess('q')">Q</button>
      <button class="letter" @click="addGuess('r')">R</button>
      <button class="letter" @click="addGuess('s')">S</button>
      <button class="letter" @click="addGuess('sz')">SZ</button>
      <button class="letter" @click="addGuess('t')">T</button>
      <button class="letter" @click="addGuess('ty')">TY</button>
      <button class="letter" @click="addGuess('u')">U</button>
      <button class="letter" @click="addGuess('ú')">Ú</button>
      <button class="letter" @click="addGuess('ü')">Ü</button>
      <button class="letter" @click="addGuess('ű')">Ű</button>
      <button class="letter" @click="addGuess('v')">V</button>
      <button class="letter" @click="addGuess('w')">W</button>
      <button class="letter" @click="addGuess('x')">X</button>
      <button class="letter" @click="addGuess('y')">Y</button>
      <button class="letter" @click="addGuess('z')">Z</button>
      <button class="letter" @click="addGuess('zs')">ZS</button>
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
