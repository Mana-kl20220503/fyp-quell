<template>
  <header class="header">
    <h1 class="title">VapeQuell</h1>
    <nav class="navbar">
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
      <router-link to="/craving-diary" class="nav-link">
        Craving Diary
      </router-link>
      <router-link to="/vapelog" class="nav-link">Vape Log</router-link>
      <router-link to="/community" class="nav-link">Community</router-link>
      <router-link to="/healthinfo" class="nav-link">Health Info</router-link>
      <button class="logout-button">Log out</button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const model = ref(null);
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
