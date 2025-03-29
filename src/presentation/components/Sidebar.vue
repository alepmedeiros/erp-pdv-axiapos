<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-header">
      <img src="/src/assets/logo.png" alt="Logo" class="sidebar-logo" />
      <div class="sidebar-close" @click="$emit('toggle')">
        <i class="pi pi-times"></i>
      </div>
    </div>
    <div class="sidebar-wrapper">
      <nav class="menu-list">
        <div class="menu-section">
          <router-link to="/main/dashboard" class="menu-item" active-class="active">
            <div class="menu-icon">
              <i class="pi pi-home"></i>
            </div>
            <span>Dashboard</span>
          </router-link>

          <router-link to="/main/pdv" class="menu-item" active-class="active">
            <div class="menu-icon">
              <i class="pi pi-shopping-cart"></i>
            </div>
            <span>PDV</span>
          </router-link>
        </div>

      <div class="menu-section">
        <div class="menu-group">
          <div @click="toggleMenu('cadastro')" class="menu-header">
            <i class="pi pi-folder"></i>
            <span>Cadastros</span>
            <i :class="['pi', menuStatus.cadastro ? 'pi-chevron-down' : 'pi-chevron-right']"></i>
          </div>
          <transition name="slide">
            <ul v-show="menuStatus.cadastro" class="submenu">
              <li>
                <router-link to="/main/emitente" active-class="active">
                  <i class="pi pi-building"></i>
                  <span>Emitente</span>
                </router-link>
              </li>
              <li>
                <router-link to="/main/produtos" active-class="active">
                  <i class="pi pi-box"></i>
                  <span>Produtos</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </div>

        <div class="menu-group">
          <div @click="toggleMenu('financeiro')" class="menu-header">
            <i class="pi pi-wallet"></i>
            <span>Financeiro</span>
            <i :class="['pi', menuStatus.financeiro ? 'pi-chevron-down' : 'pi-chevron-right']"></i>
          </div>
          <transition name="slide">
            <ul v-show="menuStatus.financeiro" class="submenu">
              <li>
                <router-link to="/financeiro/contas-receber" active-class="active">
                  <i class="pi pi-money-bill"></i>
                  <span>Contas a Receber</span>
                </router-link>
              </li>
              <li>
                <router-link to="/financeiro/contas-pagar" active-class="active">
                  <i class="pi pi-credit-card"></i>
                  <span>Contas a Pagar</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </div>

        <router-link to="/relatorios" class="menu-item" active-class="active">
          <i class="pi pi-chart-bar"></i>
          <span>Relatórios</span>
        </router-link>
      </div>
    </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const menuStatus = ref({
  cadastro: false,
  financeiro: false,
});

const toggleMenu = (menu: keyof typeof menuStatus.value) => {
  menuStatus.value[menu] = !menuStatus.value[menu];
};
</script>

<style scoped>
.sidebar {
  width: 70px;
  background: linear-gradient(135deg, #2c2c54, #474787);
  color: var(--white);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow-x: hidden;
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.sidebar:hover,
.sidebar.sidebar-open {
  width: 260px;
}



.sidebar:not(.sidebar-open):not(:hover) .menu-item,
.sidebar:not(.sidebar-open):not(:hover) .menu-header {
  justify-content: center;
  padding: 12px;
  margin: 5px auto;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  min-width: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 4px 8px;
}

.sidebar:not(.sidebar-open):not(:hover) .menu-item {
  justify-content: center;
  padding: 10px;
}

.sidebar:not(.sidebar-open):not(:hover) .menu-icon {
  margin: 0;
}
.menu-item span,
.menu-header span {
  white-space: nowrap;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 12px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.sidebar:not(.sidebar-open):not(:hover) .menu-item span,
.sidebar:not(.sidebar-open):not(:hover) .menu-header span,
.sidebar:not(.sidebar-open):not(:hover) .submenu {
  opacity: 0;
  visibility: hidden;
}

.sidebar:not(.sidebar-open):not(:hover) .menu-icon {
  margin: 0;
  font-size: 1rem;
}

.sidebar:not(.sidebar-open):not(:hover) .pi {
  margin-right: 0;
  font-size: 1.2rem;
}

.sidebar:not(.sidebar-open) .menu-icon,
.sidebar:not(.sidebar-open) .pi {
  margin-right: 0;
}

.sidebar:not(.sidebar-open):hover .menu-icon {
  margin-right: 10px;
}

.sidebar-wrapper {
  position: relative;
  height: calc(100vh - 75px);
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  z-index: 4;
  padding-bottom: 30px;
}

.sidebar-wrapper::-webkit-scrollbar {
  display: none;
}



.sidebar:not(.sidebar-open):hover .menu-item,
.sidebar:not(.sidebar-open):hover .menu-header {
  justify-content: flex-start;
}

.sidebar:not(.sidebar-open) .sidebar-logo {
  width: 35px;
  margin: 0 auto;
  transition: width 0.3s, margin 0.3s;
}

.sidebar:not(.sidebar-open):hover .sidebar-logo {
  width: auto;
  margin: 0;
}

.sidebar-header {
  height: 75px;
  padding: 15px 15px 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.sidebar-logo {
  height: 35px;
  width: auto;
  transition: all 0.3s ease;
}

.sidebar-close {
  display: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

@media (max-width: 991.98px) {
  .sidebar-close {
    display: block;
  }
}

.sidebar-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-list {
  list-style: none;
  padding: 15px;
  margin: 0;
}

.menu-section {
  margin-bottom: 20px;
}

.menu-group {
  margin-bottom: 10px;
}

.menu-header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  transition: all 0.3s ease;
  margin: 5px 15px;
  justify-content: flex-start;
}

.menu-header:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
}



.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 4px 8px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
}

.menu-header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  transition: all 0.3s ease;
  margin: 5px 15px;
  justify-content: flex-start;
}

.menu-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 10px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}
.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
}

.menu-item:hover .menu-icon {
  transform: scale(1.1);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.9);
  color: #2c2c54;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  font-weight: 600;
  transform: translateX(4px);
}

.menu-item.active .menu-icon {
  background: #2c2c54;
  color: #fff;
}

.submenu {
  list-style: none;
  padding-left: 45px;
  margin: 5px 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu li a {
  display: flex;
  align-items: center;
  padding: var(--spacing-2);
  color: var(--white);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: background-color 0.2s;
}

.submenu li a i {
  margin-right: var(--spacing-2);
}

.submenu li a:hover,
.submenu li a.active {
  background-color: var(--primary-dark);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 576px) {
  .sidebar {
    width: 100%;
  }

  .sidebar-open {
    left: 0;
  }
}
</style>
