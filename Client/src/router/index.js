import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import TestDB from '@/views/TestDB.vue';

// Dashboard
import DashboardView from '@/views/Dashboard/DashboardView.vue';
import MyPageView from '@/views/Dashboard/MyPageView.vue';

// Community
import CommunityView from '@/views/Community/CommunityView.vue';
import NewPostView from '@/views/Community/NewPostView.vue';

// CravingDiary
import CravingView from '@/views/CravingDiary/CravingView.vue';
import NewDiaryView from '@/views/CravingDiary/NewDiaryView.vue';

// HealthInfo
import HealthInfoView from '@/views/HealthInfo/HealthInfoView.vue';
import ArticlePageView1 from '@/views/HealthInfo/ArticlePageView1.vue';
import ArticlePageView2 from '@/views/HealthInfo/ArticlePageView2.vue';
import ArticlePageView3 from '@/views/HealthInfo/ArticlePageView3.vue';

// VapeLog
import VapeLogView from '@/views/VapeLog/VapeLogView.vue';
import NewPuffLogView from '@/views/VapeLog/NewPuffLog.vue';
import TodayLogView from '@/views/VapeLog/TodayLogView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/dashboard/my-page',
      name: 'mypage',
      component: MyPageView,
    },
    {
      path: '/communities',
      name: 'community',
      component: CommunityView,
    },
    {
      path: '/communities/new',
      name: 'newpost',
      component: NewPostView,
    },
    {
      path: '/diary/all',
      name: 'diary',
      component: CravingView,
    },
    {
      path: '/diary/new',
      name: 'newdiary',
      component: NewDiaryView,
    },
    {
      path: '/health',
      name: 'healthinfo',
      component: HealthInfoView,
    },
    {
      path: '/health/articles/1',
      name: 'article1',
      component: ArticlePageView1,
    },
    {
      path: '/health/articles/2',
      name: 'article2',
      component: ArticlePageView2,
    },
    {
      path: '/health/articles/3',
      name: 'article3',
      component: ArticlePageView3,
    },
    {
      path: '/vapelog',
      name: 'vapelog',
      component: VapeLogView,
    },
    {
      path: '/vapelog/new-puff',
      name: 'newpufflog',
      component: NewPuffLogView,
    },
    {
      path: '/vapelog/new-vape',
      name: 'todaylog',
      component: TodayLogView,
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
