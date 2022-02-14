import Vue from 'vue'
import VueRouter from 'vue-router'
import signup from '../views/signup.vue'
import WallPage from '../views/WallPage.vue'
import Profil from '../views/Profil.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/wall',
    name: 'WallPage',
    component: WallPage
  },
  {
    path:'/Profil',
    name: 'Profil',
    component: Profil
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
