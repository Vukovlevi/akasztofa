<script setup lang="ts"></script>

<template>
  <div>
    <div class="hero max-h-screen mt-24 bg-base-200">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-5xl font-bold">Welcome to the Hangman!</h1>
          <p class="py-6 leading-16 text-xl">
            Have you always wanted to play hangman, but you don't have a
            partner?
            <br />
            Do more of you want to guess a random word?
            <br />
            Perhaps you want to compete with friends, who can find out more
            words?
            <br />
            <span class="uppercase text-3xl">Thang Hangman is for you!</span>
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
        <p class="name text-2xl ml-28 pt-4">Play</p>
        <p class="description ml-32">
          Press the big "Play" button or go to the "Play" link in the menu and
          then choose a dictionary to play with and click on it. The game is
          starting right away!
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
        <p class="name text-2xl ml-28 pt-4">Log in</p>
        <p class="description ml-32">
          Click on the "LOGIN" button, then on the "You don't have an account
          yet? Register!" button. If you are on phone, click on the "Profile"
          icon. Create an account. After registration you will receive a
          confirmation email. Click on the link in the email and there you have
          an active account. The details of the account can be found in the
          "Profile" menu, like your email address, your points, your
          dictionaries and your username.
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
        <p class="name text-2xl ml-28 pt-4">Upload your own dictionary</p>
        <p class="description ml-32">
          If you have an account, you can have up to 3 dictionaries. With them,
          you can challenge your friends or if you are a teacher, you can test
          your students' vocabulary. It's because you can upload in any language
          that uses the latin alphabet. So what should you do? Click on the
          "Upload" button in the menu, then read the requirements carefully. If
          you are done with that, you can upload your dictionary. If it's
          successful, anybody can play it.
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
