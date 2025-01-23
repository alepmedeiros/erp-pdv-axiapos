import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';
import Emitente from '@/views/Emitente.vue';
import Produtos from '@/views/Produtos.vue';
import PDV from '@/views/PDV.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
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
