<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <h1 class="text-2xl font-ultra text-center mb-4">New Puff Logs</h1>
    <p class="text-center font-worksans mb-6">Are you smoking right now?</p>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Select the vape you are smoking now
      </label>
      <select
        v-model="selectedBrand"
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option disabled value="">Select</option>
        <option v-for="brand in vapes" :key="brand.id" :value="brand">
          {{ brand.brand }}
        </option>
      </select>
    </div>

    <p class="text-center font-worksans mb-2">
      Tap button every time you smoke
    </p>
    <button
      @click="incrementPuffCount"
      :disabled="!selectedBrand"
      class="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
    >
      Puff ↑
    </button>
    <h1 class="text-center font-ultra mb-4 text-xl">Today's Total Puffs</h1>
    <div
      class="bg-custom-red text-white text-xl font-bold py-2 px-4 rounded mb-5"
    >
      <p>{{ puffCount }}</p>
      <span>puffs 🚬</span>
    </div>
    <div class="bg-custom-red text-white text-xl font-bold py-2 px-4 rounded">
      <p>{{ nicotineTotal }} mg</p>
      <span>nicotine 🚬</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import useAuthStore from '@/stores/auth';
const selectedBrand = ref(null);
const vapes = ref([]);
const authStore = useAuthStore();
const puffCount = ref(0);
const nicotineTotal = ref(0);
async function getVapes() {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3000/getVapes',
  });
  vapes.value = response.data;
  console.log('vapes.value', vapes.value);
  vapes.value = vapes.value.filter((v) =>
    authStore.user.uniqueVapeIds.includes(v.id)
  );
  console.log('my vapes', vapes.value);
}
async function incrementPuffCount() {
  console.log('data', selectedBrand.value);

  const response = await axios({
    method: 'post',
    url: 'http://localhost:3000/addPuffLog',
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
    data: {
      vapeId: selectedBrand.value.id,
    },
  });

  computeTotalPuffs();
  console.log('response add puff', response.data);
}
async function computeTotalPuffs() {
  function formatDate(date) {
    const d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 1);
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/getTodayLogs',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
    });
    puffCount.value = response.data.length;
    nicotineTotal.value = parseFloat(
      response.data
        .reduce((accumulator, item) => {
          return accumulator + parseFloat(item.nicotineIntake);
        }, nicotineTotal.value)
        .toFixed(2)
    );
    console.log('response from get today logs', response);
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
}
onMounted(() => {
  getVapes();
  computeTotalPuffs();
});
</script>

<style></style>
