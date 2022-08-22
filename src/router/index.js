import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const Home = () => import('../views/Home.vue')
const SignUp = () => import('../views/sign/SignUp')
const SingIn = () => import('../views/sign/SignIn')
const Main = ()=> import('../views/Main')
const routes = [

  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/signin',
    component: SingIn,
  },
  {
    path: '/main',
    component:Main,
    meta:{ requiresAuth: true ,title:"主页"},
  },
  {
    path: '/',
    component: Home
  },

]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
})

export default router
