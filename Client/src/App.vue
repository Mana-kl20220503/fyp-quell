<script setup>
import { ref } from 'vue';
import Header from './components/TheHeader.vue';
import Footer from './components/TheFooter.vue';
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
}

.Footer {
  /* クラス名は実際のフッターのクラス名に合わせてください */
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
