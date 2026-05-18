import { createApp } from 'vue'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from  './router'
import 'vuetify/styles'
import importVuetifyConfig from '@/plugins/vuetify.js'

createApp(App)
    .use(router)
    .use(importVuetifyConfig)
    .mount('#app')


