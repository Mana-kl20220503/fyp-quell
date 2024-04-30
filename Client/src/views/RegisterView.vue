<script setup>
import { ref } from 'vue';

const form = ref({
  first: '',
  reasonToQuit: '',
  email: '',
  password: '',
  terms: false,
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

function submit() {
  let isValid = true;

  for (const key in form.value) {
    if (!form.value[key] && key !== 'terms') {
      isValid = false;
      break;
    }
  }

  if (!form.value.terms) {
    alert('Please agree to the terms and conditions.');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    alert(JSON.stringify(form.value));
  }, 3000);
}
</script>

<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-6"
  >
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-center text-2xl font-ultra mb-4">User Registration</h3>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="first">
            User Name
          </label>
          <input
            class="shadow-custom_login appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-custom-pink placeholder-white"
            id="first"
            type="text"
            placeholder="Enter your user name"
            v-model="form.first"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow-custom_login appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-custom-green placeholder-white"
            id="email"
            type="email"
            placeholder="Enter your email"
            v-model="form.email"
          />
        </div>
        <div class="mb-6 relative">
          <label class="block text-sm font-bold mb-2" for="password">
            Password
          </label>
          <div class="relative">
            <input
              :type="visible ? 'text' : 'password'"
              class="shadow-custom_login appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-custom-yellow placeholder-gray"
              id="password"
              placeholder="Enter your password"
              v-model="form.password"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              <button type="button" @click="visible = !visible">
                <span v-show="visible">Hide</span>
                <span v-show="!visible">Show</span>
              </button>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="last">
            Reason to Quit Vape
          </label>
          <input
            class="shadow-custom_login appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-custom-lightblue placeholder-white"
            id="last"
            type="text"
            placeholder="Enter your reason to quit Vape"
            v-model="form.reasonToQuit"
          />
        </div>
        <div class="flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            v-model="form.terms"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            I agree to site terms and conditions
          </label>
        </div>
        <button
          class="bg-custom-red hover:bg-custom-blue shadow-custom_login active:shadow-custom_active text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Processing...' : 'Complete Registration' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>
