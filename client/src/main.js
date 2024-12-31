import { createApp } from 'vue'
import './style.css'
//import App from './App.vue'
import router from './router/index.js'
import Index from './components/Index.vue'

//import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Vue3Toasity from 'vue3-toastify';
createApp(Index)
.use(router)
//.use(Vue3Toastify , { autoClose: 3000, position: "top-right"   })

.use(
  Vue3Toasity,
  {
    containerClassName: 'container-classsssssss',
    toastClassName: 'toast-classssssss',
    bodyClassName: 'toast-body-Ccccct-size',
    progressClassName: 'fancy-progress-bar',
    style: {
      opacity: '1',
      userSelect: 'initial',
      //backgroundColor: 'red',
      font: '80'
    },
  } 
)

.mount('#app')
