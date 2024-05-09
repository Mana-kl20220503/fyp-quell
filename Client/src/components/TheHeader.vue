<template>
  <header class="header">
    <h1 class="title">VapeQuell</h1>
    <nav class="navbar">
      <ul v-if="authStore.isAuthenticated" class="flex gap-4">
        <li>
          <MenuDropDown :items="dashboardLinks" />
        </li>
        <li>
          <MenuDropDown :items="diaryLinks" />
        </li>
        <li>
          <MenuDropDown :items="vapeLogLinks" />
        </li>
        <li>
          <MenuDropDown :items="communityLinks" />
        </li>
        <li>
          <MenuDropDown :items="healthInfoLinks" />
        </li>
      </ul>
      <ul v-else class="flex gap-4">
        <li><router-link to="/about">About Us</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
      <button
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        class="logout-button"
      >
        Log out
      </button>
      <button v-else @click="handleLogin" class="logout-button ml-5">
        Log in
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import MenuDropDown from './MenuDropDown.vue';
import useAuthStore from '@/stores/auth';

const model = ref(null);

const router = useRouter();
const authStore = useAuthStore();
const dashboardLinks = ref({
  title: 'Dashboard',
  links: [
    { linkTitle: 'Dashboard', href: '/' },
    { linkTitle: 'My Page', href: '/dashboard/my-page' },
  ],
});

const diaryLinks = ref({
  title: 'Craving Diaries',
  links: [
    { linkTitle: 'All Diaries', href: '/diary/all' },
    { linkTitle: 'New Diary', href: '/diary/new' },
  ],
});

const vapeLogLinks = ref({
  title: 'Vape Log',
  links: [
    { linkTitle: 'Statistic', href: '/vapelog' },
    { linkTitle: 'New Puff Log', href: '/vapelog/new-puff' },
    { linkTitle: 'New Vape Log', href: '/vapelog/new-vape' },
  ],
});

const communityLinks = ref({
  title: 'Communities',
  links: [
    { linkTitle: 'All Posts', href: '/communities' },
    { linkTitle: 'New Post', href: '/communities/new' },
  ],
});

const healthInfoLinks = ref({
  title: 'Health Info',
  links: [{ linkTitle: 'All', href: '/health' }],
});

const handleLogout = () => {
  console.log('logout');
  authStore.$reset();
  router.push('/');
};

const handleLogin = () => {
  console.log('login');

  router.push('/login');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ultra&family=Work+Sans:wght@400;700&display=swap');

.header {
  background: url('@/assets/header-background.png') no-repeat center top;
  background-size: cover;
  width: 100%;
  height: 150px;
  color: #fff;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
}

.nav-link {
  font-family: 'Work Sans', sans-serif;
  text-decoration: none;
  color: #fff;
  margin-right: 3rem;
  align-self: flex-end;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px 10px;
}

.nav-link:hover {
  background-color: #717d96;
}

.logout-button {
  background-color: #fff;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 4px 4px 0px #000000;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #717d96;
}

.logout-button:active {
  box-shadow: 1px 1px 0px #000000;
  transform: translate(2px, 2px);
}

.title {
  font-family: 'Ultra', serif;
  text-align: center;
  margin: 0;
  font-size: 45px;
  padding-top: 20px;
}
</style>
