<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="@/assets/login-logo.svg"
          alt="Workflow"
        >
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Prihláste sa do svojho účtu
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input
          type="hidden"
          name="remember"
          value="true"
        >
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label
              for="email-address"
              class="sr-only"
            >Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              class="appearance-none rounded-none relative block w-full
              px-3 py-2 border border-gray-300 placeholder-gray-500
              text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500
              focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            >
          </div>
          <div>
            <label
              for="password"
              class="sr-only"
            >Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              rounded-b-md focus:outline-none focus:ring-red-500
              focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Heslo"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center
            py-2 px-4 border border-transparent
            text-sm font-medium rounded-md text-white bg-red-600
            hover:bg-red-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            @click="login"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-red-500 group-hover:text-red-400"
                aria-hidden="true"
              />
            </span>
            Prihlásiť sa
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm ml-auto">
            <a
              href="#"
              class="font-medium text-red-600 hover:text-red-500"
            >
              Zabudli ste heslo?
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const router = useRouter();
const userStore = useUserStore();

function login() {
  userStore.login('meno', 'heslo');
  router.push('/authed');
}
</script>
