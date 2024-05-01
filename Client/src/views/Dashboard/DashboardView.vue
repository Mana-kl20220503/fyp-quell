<template>
  <div class="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded">
    <div class="text-center">
      <img
        :src="user.profileImage"
        alt="User Image"
        class="w-20 h-20 rounded-full mx-auto"
      />
      <h2 class="text-lg font-bold">{{ user.name }}</h2>
      <p class="italic">{{ user.reasonToQuit }}</p>
    </div>

    <div class="my-6">
      <h3 class="text-xl font-bold text-center mb-4">Today's Vape Log</h3>
      <div class="flex justify-around items-center">
        <img
          v-if="isAllZero"
          src="/assets/cracker.png"
          alt="Cracker Left"
          class="w-12 h-auto"
        />
        <div class="flex-grow">
          <div class="bg-red-400 text-white p-4 rounded-lg shadow-md mx-2">
            Puffs Taken: {{ vapeLog.puffs }}
          </div>
          <div class="bg-blue-400 text-white p-4 rounded-lg shadow-md mx-2">
            Nicotine Intake: {{ vapeLog.nicotine }} mg
          </div>
          <div class="bg-yellow-400 text-white p-4 rounded-lg shadow-md mx-2">
            Money Spent: £{{ vapeLog.money }}
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

    <div class="my-6">
      <h3 class="text-xl font-bold text-center mb-4">Health Info</h3>
      <div @click="goToArticle" class="cursor-pointer">
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

<style scoped></style>
