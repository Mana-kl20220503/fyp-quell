<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-xl mb-4 font-ultra">New Diary</h1>
      <p class="mb-6 font-worksans">
        This diary helps you to be aware the trigger of your vape habits and
        today's declaration to quit vape!
      </p>
      <div>
        <label class="block text-lg font-medium mb-2 font-worksans">
          How would you describe your mood?
        </label>
        <div class="flex justify-center space-x-4 mb-4">
          <img
            v-for="option in moodOptions"
            :key="option.id"
            :src="option.image"
            :alt="option.text"
            class="w-12 h-12 cursor-pointer transition-transform duration-300 ease-in-out"
            :class="{
              'scale-125': mood.id === option.id,
              'hover:scale-110': mood.id !== option.id,
            }"
            @click="selectMood(option)"
          />
        </div>
      </div>
      <div>
        <label class="block text-lg font-medium mb-2 font-worksans">
          How would you describe your feeling today?
        </label>
        <textarea
          v-model="feeling"
          rows="3"
          class="border border-gray-300 rounded-lg w-96 p-2 transition-all duration-300 ease-in-out hover:border-blue-400 focus:border-blue-500"
        ></textarea>
      </div>
      <button
        @click="submitForm"
        :class="{
          'bg-green-500': submitted,
          'bg-custom-red hover:bg-custom-blue': !submitted,
        }"
        class="text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        Submit
      </button>
      <!-- Success Message -->
      <div
        v-if="showSuccessMessage"
        class="mt-4 text-green-500 animate-fadeInOut"
      >
        Successfully submitted your diary entry!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
const mood = ref({});
const feeling = ref('');
const submitting = ref(false);
const showSuccessMessage = ref(false);
const submitted = ref(false);

const moodOptions = [
  { id: 'mood1', text: 'Sad', image: '/assets/Emoji_sad.png' },
  { id: 'mood2', text: 'Normal', image: '/assets/Emoji_normal.png' },
  { id: 'mood3', text: 'Happy', image: '/assets/Emoji_smile.png' },
];

function selectMood(selectedMood) {
  mood.value = selectedMood;
}
async function submitForm() {
  submitting.value = true;
  try {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/addDiary',
      headers: { Authorization: `Bearer ${authStore.token}` },
      data: {
        content: feeling.value,
        mood: mood.value.text,
      },
    });
    showSuccessMessage.value = true;
    submitted.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
      resetForm();
      submitting.value = false;
      submitted.value = false;
    }, 3000);
  } catch (error) {
    console.error('Submission error', error);
    submitting.value = false;
  }
  feeling.value = '';
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

function resetForm() {
  mood.value = {};
  feeling.value = '';
  getProfile();
}
</script>

<style>
@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.animate-fadeInOut {
  animation: fadeInOut 3s ease-in-out;
}
</style>
