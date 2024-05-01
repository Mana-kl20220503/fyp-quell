<template>
  <div class="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
    <h1 class="text-2xl font-ultra mb-4">New Vape Log</h1>
    <p class="mb-6 font-worksans">Did you buy a new vape?</p>
    <form @submit.prevent="submitForm" class="w-full max-w-lg">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          What type of vape did you buy?
        </label>
        <div>
          <label class="flex items-center mb-2">
            <input
              type="radio"
              name="vapeType"
              v-model="vapeType"
              value="Disposable Vape"
              class="mr-2"
            />
            Disposable Vape
          </label>
          <label class="flex items-center mb-2">
            <input
              type="radio"
              name="vapeType"
              v-model="vapeType"
              value="Refillable Vape"
              class="mr-2"
            />
            Refillable Vape
          </label>
          <label class="flex items-center mb-2">
            <input
              type="radio"
              name="vapeType"
              v-model="vapeType"
              value="Pod/e-liquid"
              class="mr-2"
            />
            Pod/e-liquid
          </label>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Which brand did you buy?
        </label>
        <select
          v-model="selectedBrand"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option disabled value="">Select</option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.name">
            {{ brand.name }}
          </option>
        </select>
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
        <label class="block text-gray-700 text-sm font-bold mb-2">
          How much was it (per 1 item)?
        </label>
        <input
          type="number"
          v-model="itemPrice"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-4">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="isAware" class="mr-2" />
          Are you aware that vape brand name contains {{ nicotineContent }}mg/ml
          of nicotine?
        </label>
      </div>

      <div class="mb-6">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="isEquivalent" class="mr-2" />
          Also is it the equivalent of smoking up to
          {{ cigaretteEquivalent }} cigarettes?
        </label>
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const vapeType = ref('');
const selectedBrand = ref('');
const itemCount = ref(0);
const itemPrice = ref(0);
const nicotineContent = ref(0);
const cigaretteEquivalent = ref(0);
const isAware = ref(false);
const isEquivalent = ref(false);

const brands = ref([
  { id: 1, name: 'ELFBAR', nicotine: 20, cigarettes: 20 },
  { id: 2, name: 'Lost Mary', nicotine: 15, cigarettes: 15 },
  // Add other brands here
]);

watch(selectedBrand, (newBrand) => {
  const brand = brands.value.find((b) => b.name === newBrand);
  if (brand) {
    nicotineContent.value = brand.nicotine;
    cigaretteEquivalent.value = brand.cigarettes;
  }
});

function submitForm() {
  alert(
    `Submitting: ${selectedBrand.value} with ${itemCount.value} items at ${itemPrice.value} each.`
  );
  // Here, you would typically send a request to your backend to save the new vape log
}
</script>

<style>
/* Tailwind CSS is included */
</style>
