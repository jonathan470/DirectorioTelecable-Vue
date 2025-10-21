import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/home.vue'
import Login from './components/Login.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
