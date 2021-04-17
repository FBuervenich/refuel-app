import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import CallbackPage from '@/views/Callback.vue';
import ErrorPage from '@/views/Error.vue';
// @ts-ignore
import { routeGuard } from '@/auth';
import { ROUTE_NAMES } from './routenames';

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: Home,
    beforeEnter: routeGuard,
  },
  {
    path: '/dashboard',
    name: ROUTE_NAMES.DASHBOARD,
    component: Dashboard,
    beforeEnter: routeGuard,
  },
  {
    path: '/about',
    name: ROUTE_NAMES.ABOUT,
    beforeEnter: routeGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },

  {
    path: '/callback',
    name: ROUTE_NAMES.CALLBACK,
    component: CallbackPage,
  },
  {
    path: '/error',
    name: ROUTE_NAMES.ERROR,
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
