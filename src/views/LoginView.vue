<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-md w-full space-y-8 relative">
      <div>
        <img
          class="mx-auto h-24 w-auto"
          src="@/assets/rezervujme-logo.svg"
          alt="Workflow"
        >
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Prihláste sa do svojho účtu
        </h2>
      </div>
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
            v-model="loginCredentials.login"
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
            v-model="loginCredentials.password"
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
          class="group relative w-full flex justify-center
            py-2 px-4 border border-transparent
            text-sm font-medium rounded-md text-white bg-red-600
            hover:bg-red-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          @click="login"
        >
          Prihlásiť sa
        </button>
      </div>
      <Message
        v-if="message.severity && message.content"
        class="absolute w-full"
        :severity="message.severity"
        @close="message = { severity: '', content: '' }"
      >
        {{ message.content }}
      </Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/user';

const router = useRouter();
const userStore = useUserStore();

interface Message {
  severity: string
  content: string
}
const message = ref<Message>({ severity: '', content: '' });

interface LoginCredentials {
  login: string
  password: string
}

const loginCredentials = ref<LoginCredentials>({ login: '', password: '' });

async function login() {
  try {
    await userStore.login(loginCredentials.value.login, loginCredentials.value.password);
    await router.push('/authed');
  } catch (err) {
    const error = err as AxiosError;
    message.value = { severity: 'error', content: error.response?.data.error };
  }
}
</script>
