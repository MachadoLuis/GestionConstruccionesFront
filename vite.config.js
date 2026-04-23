import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueRouter from 'unplugin-vue-router/vite'
import {fileURLToPath, URL} from 'node:url'

export default defineConfig({
  plugins: [
      VueRouter(),
      vue(),
      vuetify({
          autoImport:true
      }),
  ],
  server:{
    port:5000
  },
  resolve:{
      alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
  }
})
