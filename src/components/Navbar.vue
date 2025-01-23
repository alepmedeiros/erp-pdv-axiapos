<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <button class="menu-btn" @click="$emit('toggleSidebar')">☰</button>
      <!-- Exibir a logo passada via prop ou uma imagem padrão (QR code) -->
      <router-link to="/main">
        <img 
          :src="resolveImagePath(logo)" 
          alt="Logo" 
          class="logo" 
        />
      </router-link>
      <span class="navbar-title">SISTEMA DE NFC-e - Pré-Aula</span>
    </div>

    <!-- Área do usuário com o avatar -->
    <div class="user-info">
      <img 
        :src="userImage || defaultUserImage" 
        alt="User Avatar" 
        class="user-avatar" 
        @click="toggleDropdown" 
      />
      <span class="user-name">{{ userName }}</span>

      <!-- Transição suave para o Dropdown Menu -->
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <ul>
          <li @click="lockScreen">Bloquear Tela</li>
          <li @click="logout">Sair</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import defaultImage from '@/assets/logo.png'; // Caminho para a imagem padrão do logo
import defaultUserImage from '@/assets/semusuario.jpg'; // Caminho para uma imagem padrão de avatar

// Props para o logo, nome do usuário e imagem do usuário
const props = defineProps({
  logo: {
    type: String,
    default: '', // Caso o logo não seja passado, será usado um valor padrão
  },
  userName: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    default: '',
  },
});

const resolveImagePath = (path: string): string => {
  if (!path) {
    return defaultImage; // Retorna a imagem padrão se o caminho não for passado
  }

  // Verifica se é um caminho relativo da pasta `assets`
  if (path.startsWith('@/')) {
    // Converte para um caminho público utilizável
    return new URL(path.replace('@/', '/src/'), import.meta.url).href;
  }

  return path; // Retorna o caminho ou URL externo diretamente
};

// Estado reativo para o dropdown menu
const isDropdownOpen = ref(false);

// Função para alternar o dropdown menu
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Função para bloquear a tela (implementação pode variar)
const lockScreen = () => {
  alert('Tela bloqueada!'); // Aqui pode adicionar a lógica para bloquear a tela
  isDropdownOpen.value = false;
};

// Função para sair (logout)
const logout = () => {
  alert('Saindo...'); // Aqui pode adicionar a lógica de logout
  isDropdownOpen.value = false;
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a82f7;
  color: white;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 4px 2px -2px gray;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

.logo {
  width: 35px;
  margin-right: 10px;
  margin-left: 20px;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.user-info {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 40px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 1rem;
  font-weight: bold;
}

/* Dropdown Menu Suspenso (Centralizado abaixo do Avatar) */
.dropdown-menu {
  position: absolute;
  top: 45px; /* Posiciona logo abaixo do avatar */
  /* left: 10px; */
  right: 50%;
  transform: translateX(-50%); /* Centraliza o menu abaixo do avatar */
  background-color: white;
  color: black;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 150px;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
