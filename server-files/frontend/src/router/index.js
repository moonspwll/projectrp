import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
//   {
//     path: '/crypto',
//     name: 'Crypto',
//     component: CryptoView
//   }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
