<template>
  <Toolbar class="mb-8">
    <template #left>
      <div class="flex items-center justify-end ml-4">
        <img
          class="mr-8 h-10 w-auto"
          src="@/assets/login-logo.svg"
          alt="Workflow"
        >
        <router-link
          to="/authed/home"
          class="mx-4 text-lg"
          active-class="font-semibold text-red-600"
        >
          Home
        </router-link>
        <router-link
          to="/authed/layout"
          class="mx-4 text-lg"
          active-class="font-semibold text-red-600"
        >
          Layout
        </router-link>
        <router-link
          to="/authed/about"
          class="mx-4 text-lg"
          active-class="font-semibold text-red-600"
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
