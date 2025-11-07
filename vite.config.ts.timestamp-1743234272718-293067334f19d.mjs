// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/repositorio/erppdv/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/repositorio/erppdv/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/repositorio/erppdv/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue()
  ],
  test: {
    globals: true,
    // Habilita o uso de APIs globais como 'describe' e 'it'
    environment: "jsdom",
    // Simula o DOM para testes de componentes Vue
    setupFiles: "./src/tests/setup.ts",
    // Arquivo opcional para configurações globais de testes
    include: ["/src/tests/**/*.spec.ts", "/src/tests/**/*.test.ts"]
    // Define os arquivos de teste a serem incluídos
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxyZXBvc2l0b3Jpb1xcXFxlcnBwZHZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHJlcG9zaXRvcmlvXFxcXGVycHBkdlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcmVwb3NpdG9yaW8vZXJwcGR2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gIF0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLCAvLyBIYWJpbGl0YSBvIHVzbyBkZSBBUElzIGdsb2JhaXMgY29tbyAnZGVzY3JpYmUnIGUgJ2l0J1xuICAgIGVudmlyb25tZW50OiAnanNkb20nLCAvLyBTaW11bGEgbyBET00gcGFyYSB0ZXN0ZXMgZGUgY29tcG9uZW50ZXMgVnVlXG4gICAgc2V0dXBGaWxlczogJy4vc3JjL3Rlc3RzL3NldHVwLnRzJywgLy8gQXJxdWl2byBvcGNpb25hbCBwYXJhIGNvbmZpZ3VyYVx1MDBFN1x1MDBGNWVzIGdsb2JhaXMgZGUgdGVzdGVzXG4gICAgaW5jbHVkZTogWycvc3JjL3Rlc3RzLyoqLyouc3BlYy50cycsICcvc3JjL3Rlc3RzLyoqLyoudGVzdC50cyddLCAvLyBEZWZpbmUgb3MgYXJxdWl2b3MgZGUgdGVzdGUgYSBzZXJlbSBpbmNsdVx1MDBFRGRvc1xuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLGVBQWUsV0FBVztBQUUxUixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIdUksSUFBTSwyQ0FBMkM7QUFNeE0sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLEVBQ047QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQTtBQUFBLElBQ1QsYUFBYTtBQUFBO0FBQUEsSUFDYixZQUFZO0FBQUE7QUFBQSxJQUNaLFNBQVMsQ0FBQywyQkFBMkIseUJBQXlCO0FBQUE7QUFBQSxFQUNoRTtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
