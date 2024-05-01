<template>
  <div class="bg-gray-100 p-4 my-2 rounded shadow">
    <h3 class="text-lg font-semibold">{{ purchase.date }}</h3>
    <p>Type of Vape: {{ purchase.type }}</p>
    <p>Vape Brand: {{ purchase.brand }}</p>
    <p>Number of items: {{ purchase.items }}</p>
    <p>Total Cost: £{{ purchase.cost }}</p>
    <button
      @click="edit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
    >
      Edit
    </button>
    <button
      @click="confirm"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
    >
      Confirm
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  purchase: Object,
});

const edit = () => {
  console.log('Editing', props.purchase.id);
  // Edit logic here
};

const confirm = () => {
  console.log('Confirming', props.purchase.id);
  // Confirm logic here
};
</script>

<style scoped>
/* CSS styling if needed */
</style>
