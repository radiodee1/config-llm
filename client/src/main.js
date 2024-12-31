import { createApp } from 'vue'
import './style.css'
//import App from './App.vue'
import router from './router/index.js'
import Index from './components/Index.vue'

import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(Index)
.use(router)
.use(Vue3Toastify , { autoClose: 3000, position: "top-right" })
.mount('#app')
