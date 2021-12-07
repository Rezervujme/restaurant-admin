import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';

// eslint-disable-next-line import/no-unresolved
import 'virtual:windi-devtools';

import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import '@/theme/index.css';

import axios from 'axios';
import App from '@/App.vue';
import router from '@/router';
import { useUserStore } from '@/store/user';

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    const userStore = useUserStore();
    userStore.logout().then(() => router.push('/'));
  }
  return error;
});

const app = createApp(App)
  .use(PrimeVue)
  .use(router)
  .use(createPinia());

const userStore = useUserStore();
userStore.init();

router.isReady().then(() => {
  app.mount('#app');
});
