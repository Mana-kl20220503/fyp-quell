import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import CommunityView from '@/views/CommunityView.vue';
import RegisterView from '@/views/RegisterView.vue';
import VapeLogView from '@/views/VapeLogView.vue';
import TestDB from '@/views/TestDB.vue';
import HealthInfoView from '@/views/HealthInfoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/craving-diary',
      name: 'craving-diary',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CravingView.vue'),
    },
    {
      path: '/healthinfo',
      name: 'healthinfo',
      component: HealthInfoView,
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    },
    {
      path: '/VapeLog',
      name: 'vapelog',
      component: VapeLogView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/testdb',
      name: 'testdb',
      component: TestDB,
    },
  ],
});

export default router;
