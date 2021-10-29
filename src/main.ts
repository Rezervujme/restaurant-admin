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

import App from '@/App.vue';
import router from '@/router';

const app = createApp(App)
  .use(PrimeVue)
  .use(router)
  .use(createPinia());

router.isReady().then(() => {
  app.mount('#app');
});
