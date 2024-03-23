<script setup>
import { ref } from 'vue';

const form = ref({
  diary: '',
});

const selectedMood = ref(null);

const moods = ref([
  
  { text: 'Happy', value: 'happy', icon: '@/assets/happy_face.png' },
  { text: 'Normal', value: 'normal', icon: '@/assets/normal_face.png' },
  { text: 'Sad', value: 'sad', icon: '@/assets/sad_face.png' },
]);

const selectMood = (mood) => {
  selectedMood.value = mood;
};
</script>

<template>
  <v-app>
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent>
        <!-- User can enter craving diary -->
        <v-text-field
          v-model="form.diary"
          label="How do you feel today?"
        ></v-text-field>

        <!-- Select your mood from face icon -->
        <div class="text-center">
          <v-avatar
            v-for="mood in moods"
            :key="mood.value"
            class="ma-2"
            :color="selectedMood === mood.value ? 'blue lighten-3' : 'grey lighten-4'"
            size="50"
            @click="selectMood(mood.value)"
          >
          <!-- somehow this v-img isn't working on any ways. -->
            <v-img :src="mood.icon" contain></v-img>
          </v-avatar>
          
        </div>
        
        <!-- Submit Button -->
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-app>
</template>

<!--this img tag works

<img class="happy" src="@/assets/happy_face.png" alt="happy" />
    <img class="happy" src="@/assets/happy_face.png" alt="happy" />
          <img class="normal" src="@/assets/normal_face.png" alt="happy" />
          <img class="sad" src="@/assets/sad_face.png" alt="happy" />
        <style>
.happy{
  width: 50px;
}

.normal{
  width: 60px;
}

.sad{
  width: 55px;
}
</style>-->



