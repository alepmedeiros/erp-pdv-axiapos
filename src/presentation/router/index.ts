import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/presentation/pages/Login.vue';
import Main from '@/presentation/pages/Main.vue';
import Emitente from '@/presentation/pages/Emitente.vue';
import Produtos from '@/presentation/pages/Produtos.vue';
import PDV from '@/presentation/pages/PDV.vue';
import CadastrarUsuario from '../pages/CadastrarUsuario.vue';

// Função para verificar se o usuário está autenticado
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken'); // Substitua por uma estratégia mais segura se necessário
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
      { path: 'pdv', name: 'pdv', component: PDV },
      { path: 'emitente', name: 'emitente', component: Emitente },
      { path: 'produtos', name: 'produtos', component: Produtos },
    ],
  },
  {
    path: '/',
    redirect: (to) => {
      return isAuthenticated() ? '/main' : '/login'; // Redireciona para login se não estiver autenticado
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router;
