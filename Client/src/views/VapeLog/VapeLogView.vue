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
            Vapes '95% safer' than cigarettes messaging backfired
            <a href="/health" class="underline text-yellow-200">
              Learn more -- Click
            </a>
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

      <div class="mt-10">
        <h1 class="text-center text-2xl font-ultra mb-4">Nicotine Log/week</h1>
        <canvas id="myChart" style="width: 800px; height: 400px"></canvas>
      </div>

      <div class="mt-10 w-full max-w-4xl">
        <h2 class="text-2xl font-ultra mb-4 text-center">
          Vape Purchase History
        </h2>
        <div>
          <table class="min-w-full bg-white">
            <thead>
              <tr class="w-full bg-custom-yellow text-left">
                <th class="p-4">Date</th>
                <th class="p-4">Type of Vape</th>
                <th class="p-4">Vape Brand</th>
                <th class="p-4">Number of Items</th>
                <th class="p-4">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="purchase in purchases"
                :key="purchase.id"
                class="my-2 rounded shadow-md"
              >
                <td class="p-4">{{ purchase.createdAt }}</td>
                <td class="p-4">{{ purchase.vape.productType }}</td>
                <td class="p-4">{{ purchase.vape.brand }}</td>
                <td class="p-4">{{ purchase.quantity }}</td>
                <td class="p-4">£{{ purchase.totalCost }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import useAuthStore from '@/stores/auth';
const authStore = useAuthStore();
import Chart from 'chart.js/auto';

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

const purchases = ref([]);

function editPurchase(purchase) {
  console.log('Editing', purchase);
  // Add edit logic or link to edit form
}

function confirmPurchase(purchase) {
  console.log('Confirming', purchase);
  // Add confirm logic or API call to confirm the purchase
}

function init() {
  moneySpent.value = authStore.user.purchaseLog.reduce((acc, item) => {
    return acc + parseInt(item.totalCost);
  }, 0);

  nicotineIntake.value = authStore.user.puffLog
    .reduce((acc, item) => {
      return acc + parseFloat(item.nicotineIntake);
    }, 0)
    .toFixed(2);
}
onMounted(() => {
  init();
  totalPuffs.value = authStore.user.puffLog.length;
  purchases.value = authStore.user.purchaseLog;
});

onMounted(() => {
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Nicotine intake (mg)',
          data: [12, 19, 3, 5, 2, 3, 1],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>

<style scoped>
.custom-box {
  width: 262px; /* Set width */
  height: 270px; /* Set height */
}
</style>
