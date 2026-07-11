import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeAuthentication, restoreAuthentication } from './apis/auth.ts';
import { useUserStore } from './stores/user.ts';
import './style.css';
import App from './App.vue';
import { initializeSentry } from './services/sentry';

const pinia = createPinia();
const app = createApp(App);
initializeSentry(app);

app.use(pinia);

const userStore = useUserStore(pinia);
const restoredIdentity = restoreAuthentication();
if (restoredIdentity) userStore.setNickname(restoredIdentity.nickname);

app.mount('#app');

if (!restoredIdentity) {
    void initializeAuthentication().then(identity => {
        if (identity) userStore.setNickname(identity.nickname);
    });
}
