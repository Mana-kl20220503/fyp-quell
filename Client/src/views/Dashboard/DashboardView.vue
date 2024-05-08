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
          class="bg-custom-pink font-worksans italic p-2 border border-black rounded-md"
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
          <div class="text-5xl">{{ vapeLog.puffs }} 🚬</div>
        </div>
        <div
          class="bg-custom-blue text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p class="font-bold">Nicotine Intake:</p>
          <div class="text-5xl">{{ vapeLog.nicotine }} mg</div>
        </div>
        <div
          class="bg-custom-yellow text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p class="font-bold">Money Spent:</p>
          <div class="text-5xl">£{{ vapeLog.money }}</div>
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

  <div class="my-6 bg-white">
    <h3 class="text-xl font-ultra text-center mb-4">Health Info</h3>

    <div
      @click="goToArticle"
      class="cursor-pointer flex flex-justify border border-black m-10 p-3 rounded-md bg-custom-green"
    >
      <img
        src="/assets/vape1.jpg"
        alt="Health Info"
        class="mx-auto w-20 h-auto custom-img"
      />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry...
      </p>
    </div>
  </div>

  <div class="calendar-container mb-10">
    <v-calendar :attributes="attrs" class="v-calendar"></v-calendar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';
import axios from 'axios';
import { Calendar as VCalendar } from 'v-calendar';
import 'v-calendar/dist/style.css';

const user = ref({
  name: 'User Name',
  profileImage: '/assets/User1.png',
  reasonToQuit: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
});

const authStore = useAuthStore();

const vapeLog = ref({
  puffs: 0,
  nicotine: 0,
  money: 0,
});

const isAllZero = computed(() => {
  return (
    vapeLog.value.puffs === 0 &&
    vapeLog.value.nicotine === 0 &&
    vapeLog.value.money === 0
  );
});

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

    console.log('response from dashboard', response);
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
}

onMounted(() => {
  init();
});

const staticAttrs = ref([
  {
    key: 'today',
    highlight: {
      backgroundColor: '#ff8080',
    },
    dates: new Date(),
    popover: {
      label: 'today is vape free day!',
    },
  },
]);

// sample data
const puffsCountData = ref([
  { date: new Date(2024, 4, 1), count: 0 },
  { date: new Date(2024, 4, 2), count: 3 },
  { date: new Date(2024, 4, 3), count: 5 },
  { date: new Date(2024, 4, 4), count: 0 },
]);

const attrs = computed(() => {
  const dynamicAttrs = puffsCountData.value.map((puff) => ({
    key: `puffs-${puff.date.getDate()}`,
    dates: puff.date,
    highlight: {
      backgroundColor: puff.count === 0 ? '#faa1ae' : '',
    },
    popover: {
      label: `Puffs: ${puff.count}`,
    },
  }));

  return [...staticAttrs.value, ...dynamicAttrs];
});
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
