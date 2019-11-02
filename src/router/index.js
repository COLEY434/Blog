import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register 
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/posts',
    name: 'posts',
    component: Dashboard,
    // beforeEnter: (to, from, next) => {
    //   const id = localStorage.getItem('userID');

    //   if(id != null){
    //       next();
    //   }
    //   else{
    //     next('/login');
    //   }

      
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
