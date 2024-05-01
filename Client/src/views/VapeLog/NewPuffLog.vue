<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <h1 class="text-2xl font-ultra text-center mb-4">New Puff Logs</h1>
    <p class="text-center font-worksans mb-6">Are you smoking right now?</p>
    <p class="text-center font-worksans mb-2">
      Tap button every time you smoke
    </p>
    <button
      @click="incrementPuffCount"
      class="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
    >
      Puff ↑
    </button>
    <p class="text-center font-worksans mb-2">Today's Total Puffs</p>
    <div class="bg-custom-red text-white text-2xl font-bold py-2 px-4 rounded">
      <p>{{ puffCount }}</p>
      <span>puffs 🚬</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const puffCount = ref(0);

function incrementPuffCount() {
  puffCount.value++;
  // ここでバックエンドへのAPIコールを行い、パフ数の更新をサーバーに送信する場合
  // axios.post('/api/puff', { puffTaken: puffCount.value });
}
</script>

<style></style>
