<template>
  <div class="bg-gray-100 p-4 my-2 rounded shadow">
    <h3 class="text-lg font-semibold">{{ purchase.date }}</h3>
    <p>Type of Vape: {{ purchase.type }}</p>
    <p>Vape Brand: {{ purchase.brand }}</p>
    <p>Number of items: {{ purchase.items }}</p>
    <p>Total Cost: £{{ purchase.cost }}</p>
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
