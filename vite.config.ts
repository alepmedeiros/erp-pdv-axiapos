import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  test: {
    globals: true, // Habilita o uso de APIs globais como 'describe' e 'it'
    environment: 'jsdom', // Simula o DOM para testes de componentes Vue
    setupFiles: './src/tests/setup.ts', // Arquivo opcional para configurações globais de testes
    include: ['/src/tests/**/*.spec.ts', '/src/tests/**/*.test.ts'], // Define os arquivos de teste a serem incluídos
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  }
});
