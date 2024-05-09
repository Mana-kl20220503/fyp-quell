<template>
  <div class="max-w-4xl mx-auto p-5 bg-white">
    <div class="flex flex-justify">
      <div class="text-center px-6">
        <img
          :src="user.profileImage"
          alt="User Image"
          class="w-20 h-20 rounded-full mx-auto"
        />
        <h2 class="font-worksans">{{ user.name }}</h2>
      </div>
      <div class="text-center">
        <h2 class="text-xl font-ultra">Reason to Quit Vape</h2>
        <p class="text-sm pb-2">Keep this in your mind</p>
        <p
          class="bg-custom-pink font-worksans italic p-2 border border-black rounded-md shadow-custom"
        >
          "{{ user.reasonToQuit }}"
        </p>
      </div>
    </div>
  </div>

  <div class="my-6 bg-gray-100 p-9">
    <h3 class="text-xl font-ultra text-center mb-4">Today's Vape Log</h3>
    <div class="flex justify-around items-center">
      <img
        v-if="isAllZero"
        src="/assets/cracker.png"
        alt="Cracker Left"
        class="w-20 h-auto"
      />
      <div class="flex flex-justify">
        <div
          class="bg-custom-red text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p class="font-bold">Puffs Taken:</p>
          <div class="text-5xl">{{ puffCount }} 🚬</div>
        </div>
        <div
          class="bg-custom-blue text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p class="font-bold">Nicotine Intake:</p>
          <div class="text-5xl">{{ nicotineTotal }} mg</div>
        </div>
        <div
          class="bg-custom-yellow text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p class="font-bold">Money Spent:</p>
          <div class="text-5xl">£{{ moneySpent }}</div>
        </div>
      </div>
      <img
        v-if="isAllZero"
        src="/assets/cracker_right.png"
        alt="Cracker Right"
        class="w-20 h-auto"
      />
    </div>
  </div>

  <div class="flex flex-col items-center w-screen mb-10 pb-5">
    <div class="my-1 bg-white w-[60vw] py-4 px-6 flex flex-col items-center">
      <h3 class="text-xl font-ultra text-center mb-4">Health Info</h3>

      <div
        @click="goToArticle"
        class="bg-custom-green hover:bg-gray-300 active:bg-gray-400 rounded-lg overflow-hidden shadow-custom active:shadow-custom_active border border-black flex items-center transition-colors duration-300 cursor-pointer gap-4 mb-10"
      >
        <img
          src="@/assets/article2_header.jpg"
          alt="Health news"
          class="mx-auto w-20 h-auto custom-img mr-2"
        />
        <p>
          Compounds produced by heating some fruit-flavoured vape liquids have
          implications for lung and cardiovascular disease and cancer...
        </p>
      </div>
    </div>
  </div>

  <div class="calendar-container mb-14">
    <v-calendar :attributes="attrs" class="v-calendar"></v-calendar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';
import axios from 'axios';
import { Calendar as VCalendar } from 'v-calendar';
import 'v-calendar/dist/style.css';

const puffCount = ref(0);
const nicotineTotal = ref(0);
const moneySpent = ref(0);

const user = ref({
  name: 'User Name',
  profileImage: '/assets/User2.png',
  reasonToQuit: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
});

const authStore = useAuthStore();

// const isAllZero = computed(() => {
//   return (
//     vapeLog.value.puffs === 0 &&
//     vapeLog.value.nicotine === 0 &&
//     vapeLog.value.money === 0
//   );
// });

const router = useRouter();

function goToArticle() {
  router.push('/health/article/1');
}

async function init() {
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

    computeTotalPuffs();
    computeTodaySpending();

    console.log('response from dashboard', response);
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
}

async function computeTodaySpending() {
  const getSimpleDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
  const today = getSimpleDate(new Date());
  const todayEntries = authStore.user.purchaseLog.filter(
    (item) => getSimpleDate(item.createdAt).getTime() === today.getTime()
  );
  moneySpent.value = todayEntries.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.totalCost);
  }, 0);
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
  init();
});

// const staticAttrs = ref([
//   {
//     key: 'today',
//     highlight: {
//       backgroundColor: '#ff8080',
//     },
//     dates: new Date(),
//     popover: {
//       label: 'today is vape free day!',
//     },
//   },
// ]);

// // sample data
// const puffsCountData = ref([
//   { date: new Date(2024, 4, 1), count: 0 },
//   { date: new Date(2024, 4, 2), count: 3 },
//   { date: new Date(2024, 4, 3), count: 5 },
//   { date: new Date(2024, 4, 4), count: 0 },
// ]);

// const attrs = computed(() => {
//   const dynamicAttrs = puffsCountData.value.map((puff) => ({
//     key: `puffs-${puff.date.getDate()}`,
//     dates: puff.date,
//     highlight: {
//       backgroundColor: puff.count === 0 ? '#faa1ae' : '',
//     },
//     popover: {
//       label: `Puffs: ${puff.count}`,
//     },
//   }));

//   return [...staticAttrs.value, ...dynamicAttrs];
// });
</script>

<style scoped>
.custom-box {
  width: 160px; /* Set width */
  height: 170px; /* Set height */
}

.custom-img {
  width: 160px; /* Set width */
  height: auto;
}

.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
}
</style>
