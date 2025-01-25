import { createApp } from 'vue';
import App from './App.vue';
import router from './presentation/router';
import VMoney from 'v-money3';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(router);
app.use(VMoney);
app.use(PrimeVue);
app.mount('#app');
