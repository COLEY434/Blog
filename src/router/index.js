import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import Posts from '../components/Posts'
import Post from '../components/Post'
import PostReplies from '../components/PostReplies'
import ChangePassword from '../components/Dashboard/Password'
import Profile from '../components/Dashboard/Profile'
import EditProfile from '../components/Dashboard/EditProfile'
import NotFoundComponent from '../components/NotFoundComponent'
import NewProfileComponent from '../components/Profile/Profile'





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
    component: NewProfileComponent
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
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'change-password',
        component: ChangePassword
    
      },
      {
        path: 'profile',
        component: Profile
    
      },
      {
        path: 'Edit-Profile',
        component: EditProfile
    
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
