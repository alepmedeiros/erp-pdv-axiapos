import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/presentation/pages/Login.vue';
import Main from '@/presentation/pages/Main.vue';
import Emitente from '@/presentation/pages/Emitente.vue';
import Produtos from '@/presentation/pages/Produtos.vue';
import PDV from '@/presentation/pages/PDV.vue';
import CadastrarUsuario from '../pages/CadastrarUsuario.vue';
import apiClient from '@/infrastructure/api/api';

// Função para verificar se o usuário está autenticado
const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) return false;

    const isExpired = parseInt(expirationTime) < Date.now();
    if (isExpired) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return false;

      try {
        const response = await apiClient.post('/auth/refresh', { refresh_token: refreshToken });
        const { access_token, refresh_token, expires_in } = response.data;
        const newExpirationTime = Date.now() + expires_in * 1000;
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        localStorage.setItem('tokenExpiration', newExpirationTime.toString());
        return true;
      } catch {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
};


const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: CadastrarUsuario,
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/presentation/pages/Dashboard.vue') },
      { path: 'pdv', name: 'pdv', component: PDV },
      { path: 'emitente', name: 'emitente', component: Emitente },
      { path: 'produtos', name: 'produtos', component: Produtos },
    ],
  },
  {
    path: '/',
    redirect: async (to) => {
      const auth = await isAuthenticated();
      return auth ? '/main/dashboard' : '/login';
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = await isAuthenticated();

  // Se tentar acessar uma rota protegida sem autenticação
  if (to.meta.requiresAuth && !auth) {
    next({ name: 'login' });
    return;
  }

  // Se tentar acessar login/signup já estando autenticado
  if ((to.name === 'login' || to.name === 'signup') && auth) {
    next({ name: 'dashboard' });
    return;
  }

  next();
});


export default router;
