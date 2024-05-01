<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-ultra text-center mb-6">All Posts</h1>
    <div
      v-for="post in posts"
      :key="post.id"
      class="bg-white p-6 rounded-lg shadow-md mb-4"
    >
      <div class="flex justify-between items-center mb-2">
        <div>
          <img
            :src="post.profileImage"
            alt="Profile Image"
            class="w-12 h-12 rounded-full mb-1"
          />
          <span class="text-gray-600">{{ post.author }}</span>
          <h2 class="font-semibold text-lg mt-2">{{ post.createdAt }}</h2>
          <p>{{ post.content }}</p>
        </div>
        <div>
          <button
            v-if="post.authorId === currentUserId"
            @click="deletePost(post.id)"
            class="bg-custom-lightblue hover:bg-custom-red text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
          <button
            v-else
            @click="likePost(post.id)"
            class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded"
          >
            ❤️ {{ post.likes }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentUserId = ref(1); // Assume logged in user id as 1 for example

const posts = ref([
  {
    id: 1,
    userId: 1,
    profileImage: '/assets/User1.png',
    createdAt: 'Month Date, 2024 00:00',
    author: 'User Name',
    authorId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    likes: 15,
  },
  {
    id: 2,
    userId: 2,
    profileImage: '/assets/User2.png',
    createdAt: 'Month Date, 2024 00:00',
    author: 'Another User',
    authorId: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    likes: 15,
  },
  {
    id: 3,
    userId: 3,
    profileImage: '/assets/User3.png',
    createdAt: 'Month Date, 2024 00:00',
    author: 'Third User',
    authorId: 3,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    likes: 15,
  },
]);

function deletePost(postId) {
  posts.value = posts.value.filter((post) => post.id !== postId);
  // Here, you would also call the API to delete the post from the backend
}

function likePost(postId) {
  const post = posts.value.find((post) => post.id === postId);
  if (post) {
    post.likes++;
    // Call API to increment likes on the backend when it's implemented
  }
}
</script>

<style>
/* Tailwind CSS is included */
</style>
