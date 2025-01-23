<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <ul class="menu-list">
      <li class="menu-top">
        <router-link to="/main/pdv" class="full-link">PDV</router-link>
      </li>
      <!-- Menu principal com submenus -->
      <li>
        <div @click="toggleMenu('cadastro')" class="menu-header">
          <span>Cadastro</span>
          <span :class="menuStatus.cadastro ? 'arrow-down' : 'arrow-right'">▶</span>
        </div>
        <!-- Submenu que aparece conforme o estado menuStatus.cadastro -->
        <ul v-show="menuStatus.cadastro" class="submenu">
          <li><router-link to="/main/emitente">Emitente</router-link></li>
          <li><router-link to="/main/produtos">Produtos</router-link></li>
        </ul>
      </li>
      <li class="menu-top"><router-link to="/relatorios">Relatórios</router-link></li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

// Definindo props para controle de abertura do sidebar
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// Controle dos estados dos menus
const menuStatus = ref({
  cadastro: false, // Controla o submenu "Cadastro"
});

// Função para alternar a visibilidade dos submenus
const toggleMenu = (menu: string) => {
  menuStatus.value[menu] = !menuStatus.value[menu];
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #3a82f7;
  color: white;
  height: 100%;
  position: absolute;
  left: -250px; /* Sidebar oculto por padrão */
  top: 0;
  transition: left 0.3s ease;
  z-index: 999;
}

.sidebar-open {
  left: 0; /* Sidebar visível quando isOpen for verdadeiro */
}

.menu-list {
  list-style-type: none;
  padding: 10px;
  padding-top: 80px;
}

.menu-list li {
  margin: 10px 0;
}

.menu-pdv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  background-color: #3a82f7;
  color: white;
  text-decoration: none;
}

.menu-pdv:hover {
  background-color: #2a6ad9;
}


.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  background-color: #3a82f7;
}

.menu-header:hover {
  background-color: #2a6ad9;
}

.arrow-right {
  transform: rotate(0);
  transition: transform 0.3s ease;
}

.arrow-down {
  transform: rotate(90deg); /* Muda a seta para baixo */
  transition: transform 0.3s ease;
}

.submenu {
  list-style-type: none;
  padding-left: 20px;
  opacity: 1;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.submenu li {
  padding: 10px 0;
}

.submenu li:hover {
  background-color: #2a6ad9;
}

.submenu li a {
  color: white;
  text-decoration: none;
}

.sidebar-open .menu-list li {
  color: white;
}

.menu-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  color: white;
  background-color: #3a82f7;
  text-decoration: none;
}

.full-link {
  color: white;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  /* align-items: center;
  justify-content: center; */
}

.menu-top:hover .full-link {
  background-color: #2a6ad9;
}

.menu-top a {
  color: white;
  text-decoration: none;
}

.menu-top:hover {
  background-color: #2a6ad9;
}
</style>
