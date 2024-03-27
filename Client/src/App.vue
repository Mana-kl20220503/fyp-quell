<script setup>
import { RouterLink, RouterView } from 'vue-router';
import {ref} from 'vue';

const tab = ref('Navigators');
const items = ref([
  // {name:'Dashboard', hasDropdown: true, dropdownItems: [{title: MyPage, route: '/'}]},
  {name:'Craving Diary',hasDropdown: true, dropdownItems: [{ title: 'New Entry', route: '/craving-diary' }, ]},
  {name:'Progress', hasDropdown: false, dropdownItems: []},
  {name:'Community', hasDropdown: true, dropdownItems: [{ title: 'New Entry', route: '/community' }, {title: 'All Posts', route: '/community'}]},
  {name:'Vape Log', hasDropdown: true, dropdownItems: [{ title: 'New Entry', route: '/vapelog' }, {title: 'All Posts', route: '/vape log'}]},
]);


// アイテムに対応するルートを取得する関数
const itemToRoute = (item) => {
  return items.value.find(x => x.name === item)?.route || '/';
};

// ドロップダウンアイテムのナビゲーション関数
const navigateTo = (dropdownItem) => {
  // ルーティングロジックをここに実装...
  console.log(`Navigate to: ${dropdownItem.route}`);
};

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
    <!--Navigation Items-->
      <v-tab
        v-for="(item,index) in items"
        :key="item.name"
        @click="tab = index"
        >
        <!-- Dropdown Menu if needed -->
        <template v-if="item.hasDropdown">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
            {{ item.name }}
          </v-btn>
          </template>
          <v-list>
            <v-list-item
            v-for="(dropdownItem, i) in item.dropdownItems"
            :key="`dropdown-${item.name}-${i}`"
            @click="navigateTo(dropdownItem)"
          >
          <v-list-item-title>{{ dropdownItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <!-- Regular Tab if no dropdown needed -->
    <template v-else>
      <v-btn :to="itemToRoute(item.name)">
        {{ item.name }}
      </v-btn>
    </template>

      </v-tab>

      <v-btn to="/login">Login</v-btn>
      <v-btn to="/register"  color = "red-darken-1">Signup</v-btn>
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
    <!-- 新しいスロット構文を使用してrouter-viewをラップする -->
    <router-view v-slot="{ Component }">
      <v-fade-transition>
        <!-- スロットから取得したComponentを動的コンポーネントとしてレンダリング -->
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
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
