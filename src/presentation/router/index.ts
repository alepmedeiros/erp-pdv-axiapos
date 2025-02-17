import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/presentation/pages/Login.vue';
import Main from '@/presentation/pages/Main.vue';
import Emitente from '@/presentation/pages/Emitente.vue';
import Produtos from '@/presentation/pages/Produtos.vue';
import PDV from '@/presentation/pages/PDV.vue';
import CadastrarUsuario from '../pages/CadastrarUsuario.vue';

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
