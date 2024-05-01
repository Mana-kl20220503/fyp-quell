<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-xl mb-4 font-ultra">New Post</h1>
      <p class="mb-6 font-worksans">
        You are not alone in the quitting vaping journey:)
      </p>

      <div>
        <label class="block text-lg font-medium mb-2 font-worksans"
          >What do you wanna share?</label
        >
        <textarea
          v-model="feeling"
          rows="3"
          class="border border-gray-300 rounded-lg w-96 p-2"
        ></textarea>
      </div>
      <button
        @click="submitForm"
        class="mt-4 bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const feeling = ref('');

function submitForm() {
  console.log('Feeling:', feeling.value);
}
</script>

<style></style>
