<template>
  <Calendar
    backgroundText
    selectMode="multi"
    class-name="multi-mode"
    language="en"
    :remarks="remarks"
  />
</template>

<script>
import { ref } from 'vue';
import Calendar from 'mpvue-calendar';

export default {
  components: {
    Calendar,
  },
  setup() {
    const remarks = ref({ '2024-10-05': 'some tings' });
    const selectDateInner = ref({ '2024-10-05': 'some tings' });

    return {
      remarks,
      selectDateInner,
    };
  },
};
</script>
