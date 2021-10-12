<template>
  <Toolbar class="mb-8">
    <template #left>
      <div class="flex items-center justify-end ml-4">
        <img
          src="https://www.primefaces.org/sakai-vue/images/logo-dark.svg"
          class="mr-8"
        >
        <router-link
          to="/authed/home"
          class="mx-4 text-lg"
        >
          Home
        </router-link>
        <router-link
          to="/authed/layout"
          class="mx-4 text-lg"
        >
          Layout
        </router-link>
        <router-link
          to="/authed/about"
          class="mx-4 text-lg"
        >
          About
        </router-link>
      </div>
    </template>
    <template #right>
      <router-link
        to="/login"
        class="mr-4 text-lg"
      >
        Log out
      </router-link>
    </template>
  </Toolbar>
  <router-view />
</template>
