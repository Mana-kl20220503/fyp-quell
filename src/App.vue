<script setup>
import { RouterLink, RouterView } from 'vue-router'

import {ref} from 'vue';

const tab = ref('Navigators');
const items = ref([
  'Dashboard', 'Craving Diary', 'Progress', 'Community', 'Calender',
]);

function itemToRoute(item) {
  const routeMap = {
    'Dashboard': '/',
  'Craving Diary': '/craving-diary',
  'Progress': '/progress',
  'Community': '/community',
  'Calender' : '/calender',
  };
  return routeMap[item];
}
</script>

<template>
  <v-app>
    <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 text-basil" >
        VapeQuell
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :to="itemToRoute(item)"
      >
        {{ item }}
      </v-tab>

      <v-btn to="/login">Login</v-btn>
      <v-btn color = "red-darken-1">Signup</v-btn>
    </v-tabs>

    <!-- <v-window v-model="tab">
      <v-window-item
        v-for="item in items"
        :key="item"
        :value="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-window-item>
    </v-window> -->
  </v-card>

  <v-main>
    <v-container fluid>
      <v-fade-transition>
    <RouterView />
  </v-fade-transition>
  </v-container>

  </v-main>
</v-app>
</template>

<style>
/* Helper classes */
.bg-basil {
  background-color: #FFFBE6 !important;
}
.text-basil {
  color: #356859 !important;
}
</style>
