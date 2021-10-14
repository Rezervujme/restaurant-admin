import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import NProgress from 'nprogress';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/authed/',
    component: () => import('@/layouts/Authed.vue'),
    children: [
      {
        path: '',
        redirect: '/authed/home',
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'layout',
        name: 'Layout',
        component: () => import('@/views/Layout.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
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
