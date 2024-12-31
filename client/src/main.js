import { createApp } from 'vue'
import './style.css'
//import App from './App.vue'
import router from './router/index.js'
import Index from './components/Index.vue'

import Toast , { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(Index)
.use(router)
.use(Toast , { position: POSITION.BOTTOM_CENTER })
.mount('#app')
