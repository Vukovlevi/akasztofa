<script setup lang="ts">
import { Database } from "~~/types/supabase";

definePageMeta({
  middleware: ["getusername"],
});

const client = useSupabaseClient<Database>();

const route = useRoute();
const dictionary = route.params.dictionary;
const dictionary_uploader = dictionary.toString().split("*")[0];
const { data, pending } = await useFetch("/api/getdictionary", {
  method: "POST",
  body: {
    dictionary: dictionary,
  },
});

const showNextGame = ref(false);
const winnerState = ref("default");
let incorrectGuesses = 0;
let HANGMANPARTS: NodeListOf<Element>;
onMounted(() => {
  document.addEventListener("keypress", handler);
  generateWord();
});
onUnmounted(() => document.removeEventListener("keypress", handler));

function generateRandom(min: number, max: number) {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

const word = ref("");
const guesses = ref<string[]>([]);

function generateWord() {
  if (data.value) {
    const index = generateRandom(0, data.value.length);
    word.value = data.value[index];
  }
}

async function win() {
  showNextGame.value = true;
  const user: any = useState("user").value;
  winnerState.value = "winner";
  if (user && useSupabaseUser().value?.id != dictionary_uploader) {
    user.score++;
    const { error } = await client
      .from("users")
      .update({ score: user.score })
      .eq("user_id", user.user_id);
    if (error) {
      return alert(`Nem sikerült updatelni! ${error.message}`);
    }
    useState("user").value = user;
  }
}

function lose() {
  showNextGame.value = true;
  winnerState.value = "loser";
}

function nextGame() {
  if (HANGMANPARTS)
    HANGMANPARTS.forEach((part) => part.classList.add("invisible"));
  guesses.value.forEach((guess) => {
    const letterEl = document.querySelector(`[data-letter="${guess}"]`);
    letterEl?.classList.remove("correct");
    letterEl?.classList.remove("incorrect");
  });
  guesses.value = [];
  for (let i = 0; i < word.value.length; i++) {
    const deleteElContent = document.querySelector(`[data-index="${i}"]`)!;
    deleteElContent.textContent = "";
  }
  showNextGame.value = false;
  incorrectGuesses = 0;
  winnerState.value = "default";
  generateWord();
}

function correctGuess(letter: string) {
  const guessedLetter = document.querySelector(`[data-letter="${letter}"]`);
  guessedLetter?.classList.add("correct");
  const checkedLeters: string[] = [];
  for (let i = 0; i < word.value.length; i++) {
    if (letter == word.value[i]) {
      const guessedLetterElement = document.querySelector(
        `[data-index="${i.toString()}"]`
      )!;
      guessedLetterElement.textContent = word.value[i].toUpperCase();
    }
  }
  for (let i = 0; i < word.value.length; i++) {
    if (checkedLeters.includes(word.value[i])) continue;
    checkedLeters.push(word.value[i]);
    if (!guesses.value.includes(word.value[i])) return;
  }
  win();
}

function drawHangman() {
  if (!HANGMANPARTS) HANGMANPARTS = document.querySelectorAll(".hangman");
  HANGMANPARTS[incorrectGuesses].classList.remove("invisible");
  incorrectGuesses++;
  if (incorrectGuesses >= 10) lose();
}

function incorrectGuess(letter: string) {
  const guessedLetter = document.querySelector(`[data-letter="${letter}"]`);
  guessedLetter?.classList.add("incorrect");
  drawHangman();
}

function multipleLetter(letter: string) {
  if (showNextGame.value || guesses.value.includes(letter)) return;
  guesses.value.push(letter);
  const guessedLetter = document.querySelector(`[data-letter="${letter}"]`);
  if (word.value.includes(letter)) {
    guessedLetter?.classList.add("correct");
    const letters = letter.split("");
    letters.forEach((elem) => addGuess(elem));
    return;
  }
  guessedLetter?.classList.add("incorrect");
  drawHangman();
}

function addGuess(letter: string) {
  if (showNextGame.value || guesses.value.includes(letter)) return;
  guesses.value.push(letter);
  if (word.value.includes(letter)) correctGuess(letter);
  else incorrectGuess(letter);
}

function handler(event: KeyboardEvent) {
  const letter = event.key;
  if (!letter.match(/^[a-záéíóöőúüű]$/)) return;
  addGuess(letter);
}
</script>

<template>
  <ClientOnly>
    <div class="pt-24 flex flex-col justify-end gap-4">
      <div class="grow relative">
        <div class="mx-auto max-w-max">
          <div v-if="showNextGame" class="absolute translate-x-[-50%] z-10">
            <div
              v-if="winnerState == 'winner'"
              class="alert alert-success shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Gratulálok! Kitaláltad a szót!</span>
            </div>
            <div
              v-if="winnerState == 'loser'"
              class="alert alert-error shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                >Sajnálom, ez most nem sikerült! <br />
                A kitalálandó szó a "{{ word }}" volt.</span
              >
            </div>
          </div>
          <span class="hangman invisible base"></span>
          <span class="hangman invisible column"></span>
          <span class="hangman invisible rod"></span>
          <span class="hangman invisible rope"></span>
          <span class="hangman invisible head"></span>
          <span class="hangman invisible body"></span>
          <span class="hangman invisible left-arm"></span>
          <span class="hangman invisible right-arm"></span>
          <span class="hangman invisible left-foot"></span>
          <span class="hangman invisible right-foot"></span>
        </div>
      </div>
      <div class="mx-auto mt-80 flex">
        <p v-if="pending">Töltés...</p>
        <p
          v-else
          v-for="keyletter in word.length"
          class="border-b-4 mr-4 text-3xl w-12 text-center"
        >
          <span :data-index="(keyletter - 1).toString()"></span>
        </p>
        <button
          v-if="showNextGame"
          class="btn btn-success ml-10 hover:opacity-70 focus:opacity-70"
          @click="nextGame()"
        >
          Következő játék!
        </button>
      </div>
      <div class="letter-container grid grid-cols-11 w-3/5 mx-auto mb-6 gap-2">
        <button class="letter" data-letter="a" @click="addGuess('a')">A</button>
        <button class="letter" data-letter="á" @click="addGuess('á')">Á</button>
        <button class="letter" data-letter="b" @click="addGuess('b')">B</button>
        <button class="letter" data-letter="c" @click="addGuess('c')">C</button>
        <button class="letter" data-letter="cs" @click="multipleLetter('cs')">
          CS
        </button>
        <button class="letter" data-letter="d" @click="addGuess('d')">D</button>
        <button class="letter" data-letter="dz" @click="multipleLetter('dz')">
          DZ
        </button>
        <button class="letter" data-letter="dzs" @click="multipleLetter('dzs')">
          DZS
        </button>
        <button class="letter" data-letter="e" @click="addGuess('e')">E</button>
        <button class="letter" data-letter="é" @click="addGuess('é')">É</button>
        <button class="letter" data-letter="f" @click="addGuess('f')">F</button>
        <button class="letter" data-letter="g" @click="addGuess('g')">G</button>
        <button class="letter" data-letter="gy" @click="multipleLetter('gy')">
          GY
        </button>
        <button class="letter" data-letter="h" @click="addGuess('h')">H</button>
        <button class="letter" data-letter="i" @click="addGuess('i')">I</button>
        <button class="letter" data-letter="í" @click="addGuess('í')">Í</button>
        <button class="letter" data-letter="j" @click="addGuess('j')">J</button>
        <button class="letter" data-letter="k" @click="addGuess('k')">K</button>
        <button class="letter" data-letter="l" @click="addGuess('l')">L</button>
        <button class="letter" data-letter="ly" @click="multipleLetter('ly')">
          LY
        </button>
        <button class="letter" data-letter="m" @click="addGuess('m')">M</button>
        <button class="letter" data-letter="n" @click="addGuess('n')">N</button>
        <button class="letter" data-letter="ny" @click="multipleLetter('ny')">
          NY
        </button>
        <button class="letter" data-letter="o" @click="addGuess('o')">O</button>
        <button class="letter" data-letter="ó" @click="addGuess('ó')">Ó</button>
        <button class="letter" data-letter="ö" @click="addGuess('ö')">Ö</button>
        <button class="letter" data-letter="ő" @click="addGuess('ő')">Ő</button>
        <button class="letter" data-letter="p" @click="addGuess('p')">P</button>
        <button class="letter" data-letter="q" @click="addGuess('q')">Q</button>
        <button class="letter" data-letter="r" @click="addGuess('r')">R</button>
        <button class="letter" data-letter="s" @click="addGuess('s')">S</button>
        <button class="letter" data-letter="sz" @click="multipleLetter('sz')">
          SZ
        </button>
        <button class="letter" data-letter="t" @click="addGuess('t')">T</button>
        <button class="letter" data-letter="ty" @click="multipleLetter('ty')">
          TY
        </button>
        <button class="letter" data-letter="u" @click="addGuess('u')">U</button>
        <button class="letter" data-letter="ú" @click="addGuess('ú')">Ú</button>
        <button class="letter" data-letter="ü" @click="addGuess('ü')">Ü</button>
        <button class="letter" data-letter="ű" @click="addGuess('ű')">Ű</button>
        <button class="letter" data-letter="v" @click="addGuess('v')">V</button>
        <button class="letter" data-letter="w" @click="addGuess('w')">W</button>
        <button class="letter" data-letter="x" @click="addGuess('x')">X</button>
        <button class="letter" data-letter="y" @click="addGuess('y')">Y</button>
        <button class="letter" data-letter="z" @click="addGuess('z')">Z</button>
        <button class="letter" data-letter="zs" @click="multipleLetter('zs')">
          ZS
        </button>
      </div>
    </div>
  </ClientOnly>
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
.correct {
  --color-white: green;
  --color-grey: green;
}
.incorrect {
  --color-white: red;
  --color-grey: red;
}
.correct:hover,
.coorect:focus-visible,
.incorrect:hover,
.incorrect:focus-visible {
  opacity: 1;
  cursor: default;
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

.hangman {
  position: absolute;
  background-color: black;
}
.base {
  width: 8rem;
  height: 0.5rem;
  top: 16rem;
  transform: translateX(-50%);
}
.column {
  width: 0.5rem;
  height: 16rem;
}
.rod {
  width: 10rem;
  height: 0.5rem;
}
.rope {
  width: 0.5rem;
  height: 2rem;
  transform: translateX(9.5rem);
}
.head {
  width: 3rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  transform: translate(8.25rem, 1.5rem);
}
.body {
  width: 0.5rem;
  height: 5rem;
  transform: translate(9.5rem, 4.5rem);
}
.left-arm {
  width: 2rem;
  height: 0.5rem;
  transform: translate(8rem, 5rem) rotateZ(30deg);
}
.right-arm {
  width: 2rem;
  height: 0.5rem;
  transform: translate(9.5rem, 5rem) rotateZ(-30deg);
}
.left-foot {
  width: 3rem;
  height: 0.5rem;
  transform: translate(7.5rem, 10.25rem) rotateZ(120deg);
}
.right-foot {
  width: 3rem;
  height: 0.5rem;
  transform: translate(9rem, 10.25rem) rotateZ(-120deg);
}
</style>
