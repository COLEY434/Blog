import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Posts from '../components/Posts'
import Post from '../components/Post'
import PostReplies from '../components/PostReplies'
import ChangePassword from '../components/Profile/ChangePassword'
import NotFoundComponent from '../components/NotFoundComponent'
import NewProfileComponent from '../components/Profile/Profile'
import ProfileEdit from '../components/Profile/ProfileEdit'





Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFoundComponent },
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
    path: '/profile/:id',
    name: 'profile',
    component: NewProfileComponent,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token")
      if(token != null){
          next();      
      }
      else{
        next('/login');
      }
    }
  },
  {
    path: '/posts',
    //name: 'posts',
    component: Posts,
    children: [ 
      {
        path: '',
        component: Post
      },
      {
        path: ':postId/:username/comments',
        component: PostReplies
      }
      
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token")
      if(token != null){
          next();
      }
      else{
        next('/login');
      }
    }
  },
  {
    path: '/profile/:id/edit',
    name: 'profileEdit',
    component: ProfileEdit,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token")
      if(token != null){
          next();      
      }
      else{
        next('/login');
      }
    }
  },
  {
    path: '/change-password/edit',
    name: 'ChangePassword',
    component: ChangePassword,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token")
      if(token != null){
          next();      
      }
      else{
        next('/login');
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
