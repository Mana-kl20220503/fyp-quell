<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-xl mb-4 font-ultra">New Post</h1>
      <p class="mb-6 font-worksans">
        You are not alone in the quitting vaping journey:)
      </p>

      <div>
        <label class="block text-lg font-medium mb-2 font-worksans">
          What do you wanna share?
        </label>
        <textarea
          v-model="feeling"
          rows="3"
          class="border border-gray-300 rounded-lg w-96 p-2"
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
      <div v-if="showSuccessMessage" class="mt-4 text-green-500">
        Successfully submitted your post!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();

const feeling = ref('');
const submitting = ref(false);
const showSuccessMessage = ref(false);

async function submitForm() {
  submitting.value = true;
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/addPost',
      headers: { Authorization: `Bearer ${authStore.token}` },
      data: { content: feeling.value },
    });
    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
      resetForm();
      submitting.value = false;
    }, 3000);
  } catch (error) {
    console.error('Submission error', error);
    submitting.value = false;
  }
}

function resetForm() {
  feeling.value = '';
  getProfile();
}

async function getProfile() {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3000/getProfile',
    headers: { Authorization: `Bearer ${authStore.token}` },
  });
  authStore.user = response.data;
  console.log('response profile', response);
}
</script>

<style></style>
