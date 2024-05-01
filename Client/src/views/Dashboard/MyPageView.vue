<template>
  <div class="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded">
    <h1 class="text-2xl font-ultra mb-6 text-center">My Page</h1>
    <div class="space-y-4">
      <div
        v-for="field in fields"
        :key="field.key"
        class="flex items-center space-x-4"
      >
        <label class="w-48">{{ field.label }}</label>
        <div v-if="field.editing" :class="{ 'flex-1': field.type !== 'file' }">
          <input
            v-model="field.value"
            :type="field.type"
            class="border-2 border-black p-2 rounded w-full"
          />
        </div>
        <div v-else :class="{ 'flex-1': field.type !== 'file' }">
          <span
            class="border-2 border-black p-2 rounded inline-block min-w-full"
            >{{ field.value }}</span
          >
        </div>
        <button
          @click="toggleEdit(field)"
          class="bg-custom-red hover:bg-custom-blue text-white font-bold py-1 px-4 rounded"
        >
          {{ field.editing ? 'Confirm' : 'Edit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fields = ref([
  {
    key: 'username',
    label: 'User Name',
    value: 'sampleuser',
    editing: false,
    type: 'text',
  },
  {
    key: 'profilePicture',
    label: 'Profile Picture',
    value: '',
    editing: false,
    type: 'file',
  },
  {
    key: 'email',
    label: 'Email',
    value: 'sample@gmail.com',
    editing: false,
    type: 'email',
  },
  {
    key: 'password',
    label: 'Password',
    value: 'password',
    editing: false,
    type: 'password',
  },
  {
    key: 'reason',
    label: 'Reason to Quit Vape',
    value: 'Health Concerns',
    editing: false,
    type: 'text',
  },
]);

function toggleEdit(field) {
  field.editing = !field.editing;
}
</script>

<style scoped>
input[type='file'] {
  border: none;
  background: none;
}
</style>
