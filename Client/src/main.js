import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style.css';
import { createPinia } from 'pinia';
import VCalendar from 'v-calendar';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VCalendar);

app.mount('#app');
