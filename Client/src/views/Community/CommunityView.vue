<template>
  <div class="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
    <h1 class="text-2xl font-ultra text-center mb-6">All Posts</h1>
    <div
      v-for="post in posts"
      :key="post.id"
      class="post-item bg-white p-6 rounded-lg shadow-md mb-4 w-[70vw]"
    >
      <div class="flex justify-between items-center mb-2">
        <div>
          <img
            :src="post.author.profile[0].imgUrl"
            alt="Profile Image"
            class="w-12 h-12 rounded-full mb-1"
          />
          <span class="text-gray-600">
            {{ post.author.profile[0].userName }}
          </span>
          <h2 class="font-semibold text-lg mt-2">{{ post.createdAt }}</h2>
          <p class="w-6/7 h-auto">{{ post.content }}</p>
        </div>
        <div>
          <!-- <button
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
          </button> -->
          <button
            @click="likePost(post.id)"
            class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded flex items-center justify-center"
          >
            <span>❤️</span>
            <span>{{ post.likes }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAuthStore from '@/stores/auth';
import axios from 'axios';

const image = [
  { id: 'user1', text: 'Alice', image: '/assets/User2.png' },
  { id: 'user2', text: 'Bob', image: '/assets/User3.png' },
  { id: 'user3', text: 'Jack', image: '/assets/User3.png' },
];

const authStore = useAuthStore();

async function getPosts() {
  const publicPosts = authStore.publicPosts.filter((e) => e.isPublic);
  posts.value = publicPosts.map((post) => {
    const imgText = extractMood(post.author.profile[0].imgUrl);
    const moodImage =
      image.find((mood) => mood.text === imgText)?.image ||
      post.author.profile[0].imgUrl;
    return {
      ...post,
      author: {
        ...post.author,
        profile: [
          {
            ...post.author.profile[0],
            imgUrl: moodImage,
          },
        ],
      },

      createdAt: formatReadableDate(post.createdAt),
    };
  });
  console.log('posts', posts.value);
}

function extractMood(imgUrl) {
  if (imgUrl.includes('alice')) return 'Alice';
  if (imgUrl.includes('bob')) return 'Bob';
  if (imgUrl.includes('jack')) return 'Jack';
  return '';
}

function formatReadableDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
}

const posts = ref([]);

function deletePost(postId) {
  posts.value = posts.value.filter((post) => post.id !== postId);
  // Here, you would also call the API to delete the post from the backend
}

async function likePost(postId) {
  const postIndex = posts.value.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts.value[postIndex].likes++;
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/likePost',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        data: {
          postId: postId,
        },
      });
      console.log('Liked successfully:', response);
    } catch (error) {
      console.error('Error liking the post:', error);
      posts.value[postIndex].likes--;
    }
  }
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

async function getPublicPosts() {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3000/publicPosts',
  });
  authStore.publicPosts = response.data;
  console.log('response publicPosts', response);
}

onMounted(() => {
  getPosts();
});
</script>

<style>
/* Tailwind CSS is included */
.post-item {
  min-height: 200px;
}
</style>
