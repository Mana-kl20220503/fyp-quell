import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProgressView from '@/views/ProgressView.vue'
import CommunityView from '@/views/CommunityView.vue'
import CalenderView from '@/views/CalenderView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/craving-diary',
      name: 'craving-diary',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CravingView.vue')
    },
    {
      path: '/progress',
      name: 'progress',
      component: ProgressView
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView 
    },
    {
      path: '/calender',
      name: 'calender',
      component: CalenderView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router