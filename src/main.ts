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
import ToastService from 'primevue/toastservice';

import '@/theme/index.css';

import axios from 'axios';
import NProgress from 'nprogress';
import App from '@/App.vue';
import router from '@/router';
import { useUserStore } from '@/store/user';

axios.interceptors.request
  .use(
    (response) => { NProgress.start(); return response; },
    (error) => error,
  );

axios.interceptors.response.use((response) => {
  NProgress.done();
  return response;
}, (error) => {
  NProgress.done();
  if (error.response.status === 401) {
    const userStore = useUserStore();
    userStore.logout().then(() => router.push('/'));
  }
  return error;
});

const app = createApp(App)
  .use(PrimeVue)
  .use(router)
  .use(createPinia())
  .use(ToastService);

const userStore = useUserStore();
userStore.init();

router.isReady().then(() => {
  app.mount('#app');
});
