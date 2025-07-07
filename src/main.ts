import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { initializeGame } from './services/game';
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

initializeGame();
app.mount('#app');
