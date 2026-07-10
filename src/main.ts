import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { initializeSentry } from './services/sentry';

const pinia = createPinia();
const app = createApp(App);
initializeSentry(app);

app.use(pinia);

app.mount('#app');
