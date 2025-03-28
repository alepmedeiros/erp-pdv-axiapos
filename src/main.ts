import { createApp } from 'vue';
import App from './App.vue';
import router from './presentation/router';
import VMoney from 'v-money3';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import apiClient from './infrastructure/api/api';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});

// Middleware para carregar token ao iniciar
const loadAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

// Executa a carga do token no início da aplicação
loadAuthToken();

app.use(router);
app.use(VMoney);
app.mount('#app');
