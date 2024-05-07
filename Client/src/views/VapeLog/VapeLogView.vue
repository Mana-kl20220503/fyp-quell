<template>
  <div class="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
    <h1 class="text-2xl font-ultra mb-4">Your Total Vape Log</h1>

    <div class="flex flex-col items-center w-full max-w-4xl mb-10">
      <div class="flex flex-justify">
        <div
          class="bg-custom-red text-white p-4 mx-4 rounded-lg shadow-md border border-black custom-box"
        >
          <h2 class="font-bold">Puffs Taken</h2>
          <p class="py-4 text-5xl">{{ totalPuffs }} 🚬</p>
          <p>
            Single Vape contains 40 mg nicotine and it is equivalent to 40
            cigarettes!
          </p>
        </div>
        <div
          class="bg-custom-lightblue text-black p-4 mx-4 rounded-lg shadow-md border border-black custom-box"
        >
          <h2 class="font-bold">Nicotine Intake</h2>
          <p class="py-4 text-5xl">{{ nicotineIntake }} mg</p>
          <p>
            Nicotine cause a lot of health issues.
            <a href="/health" class="underline text-yellow-200"
              >Learn more -- Click</a
            >
          </p>
        </div>
        <div
          class="bg-custom-yellow text-black p-4 mx-4 rounded-lg shadow-md border border-black custom-box"
        >
          <h2 class="font-bold">Money Spent</h2>
          <p class="py-4 text-5xl">£{{ moneySpent }}</p>
          <p>You could buy this kind of stuff with this money:</p>
          <p>{{ whatYouCouldBuy }}</p>
        </div>
      </div>

      <div class="mt-10 w-full max-w-4xl">
        <h2 class="text-2xl font-ultra mb-4 text-center">
          Vape Purchase History
        </h2>
        <div
          v-for="purchase in purchases"
          :key="purchase.id"
          class="bg-white p-4 my-2 rounded shadow-md flex justify-between items-center"
        >
          <div class="flex flex-justify">
            <p>{{ purchase.date }}</p>
            <p>Type of Vape: {{ purchase.type }}</p>
            <p>Vape Brand: {{ purchase.brand }}</p>
            <p>Number of items: {{ purchase.items }}</p>
            <p>Total Cost: £{{ purchase.cost }}</p>
          </div>
          <div>
            <button
              @click="editPurchase(purchase)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              @click="confirmPurchase(purchase)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const totalPuffs = ref(0);
const nicotineIntake = ref(0);
const moneySpent = ref(0);
const whatYouCouldBuy = computed(() => {
  if (moneySpent.value >= 500) {
    return 'a nice laptop';
  } else if (moneySpent.value >= 100) {
    return 'a fancy dinner';
  } else {
    return 'some books';
  }
});

// Fetch data from backend and calculate the totals
// Example:
// fetch('/api/total-vape-log')
//   .then(response => response.json())
//   .then(data => {
//     totalPuffs.value = data.totalPuffs;
//     nicotineIntake.value = data.nicotineIntake;
//     moneySpent.value = data.moneySpent;
//   });

const purchases = ref([
  {
    id: 1,
    date: 'Month Date, 2024 00:00',
    type: 'Disposable Vape',
    brand: 'Brand A',
    items: 3,
    cost: 120,
  },
  {
    id: 2,
    date: 'Month Date, 2024 00:00',
    type: 'Refillable Vape',
    brand: 'Brand B',
    items: 2,
    cost: 150,
  },
  // More purchases can be added here
]);

function editPurchase(purchase) {
  console.log('Editing', purchase);
  // Add edit logic or link to edit form
}

function confirmPurchase(purchase) {
  console.log('Confirming', purchase);
  // Add confirm logic or API call to confirm the purchase
}
</script>

<style scoped>
.custom-box {
  width: 262px; /* Set width */
  height: 270px; /* Set height */
}
</style>
