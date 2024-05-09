<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-ultra text-center mb-6">History</h1>
    <p class="text-center mb-8 font-worksans">
      This diary helps you to be aware the trigger of your vape habits and
      today's declaration to quit vape!
    </p>
    <div class="flex flex-col items-center">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-6 rounded-lg shadow-md mb-4 w-1/2"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-semibold text-lg">{{ post.createdAt }}</h2>
          <div>
            <!-- <button
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
          </button> -->
          </div>
        </div>
        <img :src="post.mood" alt="Mood" class="w-12 h-12 mb-3" />
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAuthStore from '@/stores/auth';
const authStore = useAuthStore();
async function getDiaries() {
  const moodToImage = {
    Happy: '/assets/Emoji_smile.png',
    Sad: '/assets/Emoji_sad.png',
    Normal: '/assets/Emoji_normal.png',
  };
  const diaries = authStore.user.post.filter((e) => !e.isPublic);
  posts.value = diaries.map((diary) => {
    return {
      ...diary,
      mood: moodToImage[diary.mood] || diary.mood,
      createdAt: formatReadableDate(diary.createdAt),
    };
  });
  console.log('diaries', posts.value);
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
onMounted(() => {
  getDiaries();
});

// const posts = ref([]);

function editPost(post) {
  post.editing = true;
}

function confirmEdit(post) {
  post.editing = false;
  // Here, you could add a function to call a backend API to update the post
}

//sample data
const posts = ref([
  {
    id: 1,
    mood: '/assets/Emoji_smile.png',
    content:
      'Today I felt great! Enjoyed a walk in the park and did not even think about vaping.',
    createdAt: 'May 9, 2024, 09:45 AM',
    editing: false,
  },
  {
    id: 2,
    mood: '/assets/Emoji_sad.png',
    content:
      'Felt stressed today due to work and almost vaped. Need to find better ways to cope.',
    createdAt: 'May 8, 2024, 06:30 PM',
    editing: false,
  },
  {
    id: 3,
    mood: '/assets/Emoji_normal.png',
    content:
      'A normal day, nothing special. Managed to avoid vaping with little effort.',
    createdAt: 'May 7, 2024, 12:20 PM',
    editing: false,
  },
]);
</script>

<style>
/* Tailwind CSS is included */
</style>
