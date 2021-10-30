import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import NProgress from 'nprogress';
import { useUserStore } from '@/store/user';

function loggedInGuard() {
  const userStore = useUserStore();
  if (!userStore.isLoggedIn) {
    return '/login';
  }
  return true;
}

function loggedOutGuard() {
  const userStore = useUserStore();
  if (userStore.isLoggedIn) {
    return '/authed';
  }
  return true;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: loggedOutGuard,
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/authed/',
    component: () => import('@/layouts/AuthedLayout.vue'),
    beforeEnter: loggedInGuard,
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
