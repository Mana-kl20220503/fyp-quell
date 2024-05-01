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
        class="w-12 h-auto"
      />
      <div class="flex flex-justify">
        <div
          class="bg-custom-red text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p>Puffs Taken:</p>
          <div class="text-5xl">{{ vapeLog.puffs }} 🚬</div>
        </div>
        <div
          class="bg-custom-blue text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p>Nicotine Intake:</p>
          <div class="text-5xl">{{ vapeLog.nicotine }} mg</div>
        </div>
        <div
          class="bg-custom-yellow text-white p-4 rounded-lg shadow-md mx-2 border border-black custom-box"
        >
          <p>Money Spent:</p>
          <div class="text-5xl">£{{ vapeLog.money }}</div>
        </div>
      </div>
      <img
        v-if="isAllZero"
        src="/assets/cracker_right.png"
        alt="Cracker Right"
        class="w-12 h-auto"
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
        class="mx-auto w-20 h-auto"
      />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry...
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const user = ref({
  name: 'User Name',
  profileImage: '/assets/User1.png',
  reasonToQuit: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
});

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
</script>

<style scoped>
.custom-box {
  width: 150px; /* Set width */
  height: 170px; /* Set height */
}
</style>
