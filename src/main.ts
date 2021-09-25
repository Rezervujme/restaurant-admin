import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';

// eslint-disable-next-line import/no-unresolved
import 'virtual:windi-devtools';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import '@/theme/index.css';

import App from '@/App.vue';
import router from '@/router';
import { store, key } from '@/store';

const app = createApp(App)
  .use(PrimeVue)
  .use(store, key)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
