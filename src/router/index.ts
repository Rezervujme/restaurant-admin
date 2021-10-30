import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import NProgress from 'nprogress';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/authed/',
    component: () => import('@/layouts/AuthedLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/authed/home',
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'layout',
        name: 'Layout',
        component: () => import('@/views/LayoutView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (from.name) NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
