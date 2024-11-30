
import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Config from '../views/AddConfig.vue'
import List from '../views/AddList.vue'
import Var from '../views/AddVar.vue'

const routes = [

    { path: '/home:var', component: Home, props:true },
    { path: '/about', component: About },  
    { path: '/config', component: Config },
    { path: '/list', component: List },
    { path: '/variable:var', component: Var, props:true },

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
