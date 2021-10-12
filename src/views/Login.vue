<template>
  <div class="flex">
    <Button @click="router.push('/authed')">
      Login
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
