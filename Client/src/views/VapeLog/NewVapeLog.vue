<template>
  <div class="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
    <h1 class="text-2xl font-ultra mb-4">New Vape Log</h1>
    <p class="mb-6 font-worksans">Did you buy a new vape?</p>
    <form @submit.prevent="submitForm" class="w-full max-w-lg">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Which brand did you buy?
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

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2"> Type </label>
        <div v-if="selectedBrand">
          <pre>{{ selectedBrand.productType }}</pre>
        </div>
        <div v-else>Please select a brand ...</div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <div v-if="selectedBrand">
          <pre>{{ selectedBrand.price }}</pre>
        </div>
        <div v-else>Please select a brand ...</div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          How many items did you buy?
        </label>
        <input
          type="number"
          v-model="itemCount"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-4">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="isAware" class="mr-2" />
          Are you aware that vape brand name contains
          {{ selectedBrand ? selectedBrand.nicotineContent : 0 }}mg/ml of
          nicotine?
        </label>
      </div>

      <div class="mb-6">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="isEquivalent" class="mr-2" />
          Also is it the equivalent of smoking up to
          {{ selectedBrand ? selectedBrand.nicotineContent / 10 : 0 }}
          cigarettes?
        </label>
      </div>

      <button
        type="submit"
        class="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import useAuthStore from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const itemCount = ref(1);
const isAware = ref(false);
const isEquivalent = ref(false);
const vapes = ref([]);
const selectedBrand = ref(null);

async function submitForm() {
  const data = {
    vapeId: selectedBrand.value.id,
    quantity: itemCount.value,
  };
  console.log('data', data);

  const response = await axios({
    method: 'post',
    url: 'http://localhost:3000/addPurchaseLog',
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
    data: {
      vapeId: selectedBrand.value.id,
      quantity: itemCount.value,
    },
  });

  itemCount.value = 1;
  isAware.value = false;
  isEquivalent.value = false;
  selectedBrand.value = null;

  await getProfile();
  console.log('response add purchase', response);
  router.push('/vapelog');
}

async function getProfile() {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3000/getProfile',
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  });
  authStore.user = response.data;
  console.log('response profile', response);
}

async function getVapes() {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3000/getVapes',
  });

  vapes.value = response.data;
  console.log('vapes.value', vapes.value);
}

onMounted(() => {
  getVapes();
});
</script>

<style></style>
