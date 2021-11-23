<template>
  <Toolbar class="mb-8">
    <template #start>
      <div class="flex items-center justify-end ml-4">
        <img
          class="mr-8 h-10 w-auto"
          src="@/assets/rezervujme-logo.svg"
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
    <template #end>
      <p
        class="mr-4 text-lg cursor-pointer"
        @click="logout"
      >
        Log out
      </p>
    </template>
  </Toolbar>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const router = useRouter();

async function logout() {
  await userStore.logout();
  router.push('/login');
}
</script>
