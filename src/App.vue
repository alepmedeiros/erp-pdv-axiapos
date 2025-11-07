<template>
  <div id="app" :class="{ 'theme-dark': isDarkMode }">
    <div v-if="isAuthRoute" class="auth-layout">
      <router-view />
    </div>
    <div v-else class="app-container">
      <Sidebar :isOpen="isSidebarOpen" />
      <div class="main-content" :class="{ 'sidebar-open': isSidebarOpen }">
        <header class="app-header">
          <button class="menu-toggle" @click="toggleSidebar">
            <i class="pi pi-bars"></i>
          </button>
          <div class="header-actions">
            <button class="theme-toggle" @click="toggleTheme">
              <i :class="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"></i>
            </button>
          </div>
        </header>
        <main class="content-area">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './presentation/components/Sidebar.vue';

const route = useRoute();
const isAuthRoute = computed(() => {
  return route.path === '/login' || route.path === '/signup';
});

const isSidebarOpen = ref(false);
const isDarkMode = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('theme-dark');
};
</script>

<style>
@import './assets/theme.css';

body {
  margin: 0;
  font-family: var(--font-family-base);
}

.app-container {
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 70px;
  transition: margin-left 0.3s cubic-bezier(0.685, 0.0473, 0.346, 1);
  min-height: 100vh;
  background-color: var(--surface-ground);
}

.main-content.sidebar-open {
  margin-left: 260px;
  width: calc(100% - 260px);
}

.app-container {
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 70px;
  transition: margin-left 0.3s cubic-bezier(0.685, 0.0473, 0.346, 1);
  position: relative;
  z-index: 1;
  width: calc(100% - 70px);
}

.main-content.sidebar-open {
  margin-left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
}

.app-header {
  padding: 1rem;
  background: var(--surface-card);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-area {
  padding: 1.5rem;
}

.menu-toggle, .theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.menu-toggle:hover, .theme-toggle:hover {
  background: var(--surface-hover);
}

body {
  background-color: var(--light-color);
  color: var(--gray-900);
}

.theme-dark body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-open {
  margin-left: var(--sidebar-width);
}

.app-header {
  height: var(--header-height);
  background-color: var(--white);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-3);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
}

.theme-dark .app-header {
  background-color: var(--bg-color);
  border-bottom-color: var(--border-color);
}

.menu-toggle,
.theme-toggle {
  background: none;
  border: none;
  color: var(--gray-700);
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--border-radius);
}

.theme-dark .menu-toggle,
.theme-dark .theme-toggle {
  color: var(--text-color);
}

.menu-toggle:hover,
.theme-toggle:hover {
  background-color: var(--gray-100);
}

.theme-dark .menu-toggle:hover,
.theme-dark .theme-toggle:hover {
  background-color: var(--primary-dark);
}

.content-area {
  padding: var(--spacing-4);
  background-color: var(--gray-100);
  min-height: calc(100vh - var(--header-height));
}

.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--surface-ground);
  padding: var(--spacing-4);
}

.auth-content {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: var(--spacing-4);
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.theme-dark .content-area {
  background-color: var(--bg-color);
}

@media (max-width: 576px) {
  .main-content.sidebar-open {
    margin-left: 0;
  }

  .content-area {
    padding: var(--spacing-2);
  }
}
</style>
  