
import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Config from '../views/AddConfig.vue'
import List from '../views/AddList.vue'
import Var from '../views/AddVar.vue'
import Cred from '../views/AddCreds.vue'
import File from '../views/AddFile.vue'

const routes = [

    { path: '/home', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },  
    { path: '/config', name: 'config', component: Config },
    { path: '/list', name: 'list', component: List },
    { path: '/variable', name: 'variable', component: Var },
    { path: '/cred', name: 'cred', component: Cred },
    { path: '/file', name: 'file', component: File }

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
