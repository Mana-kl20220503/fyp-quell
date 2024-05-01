<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-xl mb-4 font-ultra">New Diary</h1>
      <p class="mb-6 font-worksans">
        This diary helps you to be aware the trigger of your vape habits and
        today's declaration to quit vape!
      </p>
      <div>
        <label class="block text-lg font-medium mb-2 font-worksans"
          >Today's mood?</label
        >
        <div class="flex justify-center space-x-4 mb-4">
          <img
            v-for="option in moodOptions"
            :key="option.id"
            :src="option.image"
            :alt="option.text"
            class="w-12 h-12 cursor-pointer"
            @click="selectMood(option.id)"
          />
        </div>
      </div>
      <div>
        <label class="block text-lg font-medium mb-2 font-worksans"
          >Today's feeling?</label
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

const mood = ref('');
const feeling = ref('');

const moodOptions = [
  { id: 'mood1', text: 'Sad', image: '/assets/Emoji_sad.png' },
  { id: 'mood2', text: 'Normal', image: '/assets/Emoji_normal.png' },
  { id: 'mood3', text: 'Happy', image: '/assets/Emoji_smile.png' },
];

function selectMood(selectedMood) {
  mood.value = selectedMood;
}

function submitForm() {
  console.log('Mood:', mood.value);
  console.log('Feeling:', feeling.value);
}
</script>

<style></style>
