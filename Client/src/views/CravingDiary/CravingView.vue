<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-ultra text-center mb-6">History</h1>
    <p class="text-center mb-8 font-worksans">
      This diary helps you to be aware the trigger of your vape habits and
      today's declaration to quit vape!
    </p>
    <div
      v-for="post in posts"
      :key="post.id"
      class="bg-white p-6 rounded-lg shadow-md mb-4"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-semibold text-lg">{{ post.createdAt }}</h2>
        <div>
          <button
            v-if="!post.editing"
            @click="editPost(post)"
            class="bg-custom-blue hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            v-else
            @click="confirmEdit(post)"
            class="bg-custom-red hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
      <img :src="post.mood" alt="Mood" class="w-12 h-12 mb-3" />
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([
  {
    id: 1,
    userId: 1,
    createdAt: 'Month Date, 2024 00:00',
    updatedAt: '',
    isPublic: true,
    author: 'John Doe',
    authorId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mood: '/assets/Emoji_smile.png',
    likes: 5,
    editing: false,
  },
  {
    id: 2,
    userId: 1,
    createdAt: 'Month Date, 2024 00:00',
    updatedAt: '',
    isPublic: true,
    author: 'Jane Doe',
    authorId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mood: '/assets/Emoji_normal.png',
    likes: 3,
    editing: false,
  },
  {
    id: 3,
    userId: 1,
    createdAt: 'Month Date, 2024 00:00',
    updatedAt: '',
    isPublic: true,
    author: 'John Doe',
    authorId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mood: '/assets/Emoji_sad.png',
    likes: 2,
    editing: false,
  },
]);

function editPost(post) {
  post.editing = true;
}

function confirmEdit(post) {
  post.editing = false;
  // Here, you could add a function to call a backend API to update the post
}
</script>

<style>
/* Tailwind CSS is included */
</style>
