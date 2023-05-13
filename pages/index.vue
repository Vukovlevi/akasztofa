<script setup lang="ts"></script>

<template>
  <div>
    <div class="hero max-h-screen mt-24 bg-base-200">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-5xl font-bold">Üdvözöl az Akasztófa!</h1>
          <p class="py-6 leading-16 text-xl">
            Mindig is szerettél akasztófázni, de nincs kivel? <br />
            Netán többen szeretnétek gondolkodni egy-egy kitalálandó szón?
            <br />
            Esetleg versenyeznétek távoli barátokkal, hogy ki tud több szót
            kitalálni? <br />
            <span class="uppercase text-3xl"
              >Akkor az Akasztófa nektek való!</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="m-4 flex flex-col items-center">
      <div class="feature lg:w-2/3 w-full relative mt-8">
        <NuxtLink to="/game">
          <div class="avatar absolute top-3">
            <div
              class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <svg
                fill="hsl(var(--nc))"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                />
              </svg>
            </div>
          </div>
        </NuxtLink>
        <span class="divider absolute top-0 h-4 w-full my-0 px-10"></span>
        <p class="name text-2xl ml-28 pt-4">Játék</p>
        <p class="description ml-32">
          Nyomj a nagy "Játék" gombra vagy menj át a "Játék!" menüpontra,
          válaszd ki, hogy melyik szótárral szeretnél játszani és kattints rá!
          Már mehet is a játék!
        </p>
      </div>
    </div>
    <div class="m-4 flex flex-col items-center">
      <div class="feature lg:w-2/3 w-full relative mt-8 reverse">
        <div class="avatar absolute top-3">
          <div
            class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="rounded-full border-2 border-base-content p-2 bg-base-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>
        <span class="divider absolute top-0 h-4 w-full my-0 px-10"></span>
        <p class="name text-2xl ml-28 pt-4">Jelentkezz be</p>
        <p class="description ml-32">
          Kattints a "BEJELENTKEZÉS", majd a "Még nincs fiókod? Regisztrálj!"
          gombra! Ha telefonon vagy, akkor a "Profil" ikonra kattintva teheted
          ezt meg. Hozz létre egy fiókot, a regisztráció után visszaigazoló
          e-mailt kapsz. Kattints az e-mailben található linkre és már van is
          egy aktív fiókod. Részleteit a "Profil" menüpontban találod, mint
          például e-mail cím, pontok, a szótáraid és a legfontosabb, a
          felhasználónév. A felhasználóneved te állíthatod be. Amennyiben
          szeretnéd, hogy a pontjaid mentődjenek, vagy saját szótárakat
          szeretnél, erre szükséged lesz.
        </p>
      </div>
    </div>
    <div class="m-4 flex flex-col items-center">
      <div class="feature lg:w-2/3 w-full relative mt-8">
        <div class="avatar absolute top-3">
          <div
            class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="hsl(var(--nc))"
              class="w-5/6 h-5/6 mx-auto translate-y-2"
            >
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
              />
            </svg>
          </div>
        </div>
        <span class="divider absolute top-0 h-4 w-full my-0 px-10"></span>
        <p class="name text-2xl ml-28 pt-4">Legyen saját szótárad</p>
        <p class="description ml-32">
          Ha van egy fiókod és felhasználónevet is állítottál, akkor saját
          szótárad is lehet, akár 3 is! Ezzel kihívhatod barátaid, vagy ha
          nyelvtanár vagy, tesztelheted diákjaid szókincsét, hisz a nyelv nincs
          a magyarra korlátozva (viszont a latin betűkre igen). Mit kell ehhez
          tenned? Kattints a "Feltöltés" menüpontra, majd olvasd el figyelmesen
          a követelményeket. Ha ezzel megvagy, már töltheted is fel a fájlt. A
          szótáraddal pedig bárki játszhat majd.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature {
  margin-top: 6rem;
}
.feature:last-child {
  margin-bottom: 5rem;
}
.reverse .avatar {
  right: 0;
}
.reverse .name {
  text-align: right;
  margin-left: 0;
  margin-right: 7rem;
}
.reverse .description {
  text-align: right;
  margin-left: 0;
  margin-right: 8rem;
}
</style>
