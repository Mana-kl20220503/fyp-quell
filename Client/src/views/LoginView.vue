<script setup>
import { ref } from 'vue';
import axios from 'axios';
import useAuthStore from '@/stores/auth';
import { useRouter, RouterLink } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
  remember: false,
});

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
};

const visible = ref(false);
const isLoading = ref(false);

async function submit() {
  const data = {
    email: form.value.email,
    password: form.value.password,
  };
  let isValid = true;

  if (form.value.email === '') {
    isValid = false;
  }

  if (!form.value.password) {
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  isLoading.value = true;

  const response = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/auth/login',
    data: {
      email: form.value.email,
      password: form.value.password,
    },
  });

  authStore.isAuthenticated = true;
  authStore.token = response.data.data.token;

  localStorage.setItem('token', response.data.data.token);

  console.log('response', response);

  await getProfile();
  router.push('/');
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
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 px-6">
    <div class="w-full max-w-md">
      <h3 class="font-ultra text-center text-2xl mb-6">Log in Here</h3>
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="submit"
      >
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-custom-green placeholder-white shadow-custom_login"
            id="email"
            type="email"
            placeholder="Enter your email"
            v-model="form.email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-bold mb-2" for="password">
            Password
          </label>
          <div class="relative">
            <input
              :type="visible ? 'text' : 'password'"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-custom-yellow placeholder-gray shadow-custom_login"
              id="password"
              placeholder="Enter your password"
              v-model="form.password"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              @click="visible = !visible"
            >
              <span v-show="visible">Hide</span>
              <span v-show="!visible">Show</span>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember"
              type="checkbox"
              v-model="form.remember"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <button
            class="bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-custom_login active:shadow-custom_active"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
      <p class="text-center text-sm text-gray-600">
        Don't have an account?
        <router-link
          to="/register"
          class="text-blue-500 hover:text-blue-800"
          rel="noopener noreferrer"
        >
          Sign up now
        </router-link>
      </p>
    </div>
  </div>
</template>

<style></style>
