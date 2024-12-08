import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import Index from './components/Index.vue'

createApp(Index)
.use(router)
.mount('#app')
