import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), commonjs()],
  optimizeDeps: {
    exclude: ['shared']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      shared: fileURLToPath(new URL('../shared/dist/esm', import.meta.url))
    }
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
})
