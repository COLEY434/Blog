import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    posts: [],
    dateTime: null,
    updatedDateTime: null,
    comments: [],
    token: null,
    username: null,
    userData: {}
  },
  mutations: {
    authUser(state, userData){
      state.userId = userData.userId,
      state.token = userData.token,
      state.username = userData.username
    },
    storePosts(state, payload){
      state.posts = payload
    },
    setComments(state, payload){
      state.comments = payload
    },
    clearAuthData(state){
      state.userId = null,
      state.token = null,
      state.username = null
    },
    setProfileData(state, userData){
      state.userData = userData
    },
    setUsername(state, username){
      state.username = username
    }
  },
  actions: {
    setLogoutTimer({dispatch}, expirationTime){
      console.log(expirationTime);
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime)
    },
    SetUsername({commit}, username){
      commit('setUsername', username)
    },
    authUser({commit}, userInfo){
      commit('authUser', {
        token: userInfo.token,
        userId: userInfo.userId,
        username: userInfo.username
      });
    },
    ProfileData({commit}, userData){
      commit('setProfileData', userData)
    },
    getComments({commit}, comments){
      
        commit('setComments', comments);
    },
    sendPost(context,userData){
      // console.log(state.token);
      // if(!state.token){
      //   return;
      // }
      axios.post('https://localhost:44318/api/post/create', userData)
          .then((response) => {
            const data = response.data;
            if(data.success){
              context.dispatch('getAllPost');
            }
            
          })
          .catch((error) => {
            console.log(error);
          });      
    },
    getAllPost({commit, dispatch, state}){ 
      //https://localhost:44318
       axios.get('https://localhost:44318/api/post/get-posts')
          .then((response) => {  
              const data = response.data; 
              const result = [];  
              for(let post in data)
              {
                   dispatch('getDatePosted', data[post].date_posted);
                   if(data[post].date_updated)
                   {
                    dispatch('getDateUpdated', data[post].date_updated);
                    data[post].date_updated = state.updatedDateTime;
                   }
                  data[post].date_posted = state.dateTime;

                  result.unshift(data[post]);
              }
              
              commit('storePosts', result);

          })
          .catch((error) => {
               console.log(error);
          });
    },
    getDatePosted(context, datePosted){
      var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      let date = new Date(datePosted);
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      const seconds = date.getSeconds();

      const dateTime = month + " " + day + " '" + year + " " + "at" + " " + hours + ":" + minutes + ":" + seconds;
      context.state.dateTime = dateTime;
    },
    getDateUpdated(context, dateUpdated){
      var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      let date = new Date(dateUpdated);
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      const seconds = date.getSeconds();

      const dateTime = month + " " + day + " '" + year + " " + "at" + " " + hours + ":" + minutes + ":" + seconds;
      context.state.updatedDateTime = dateTime;
    },

    logout({commit}){
      commit('clearAuthData');
      localStorage.removeItem('token');
      localStorage.removeItem('Id');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('username');
      router.replace('/login')

    },
    tryAutoLogin({commit}){
      const user_id = localStorage.getItem('Id');
      const expirationDate = localStorage.getItem('expiresIn');
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const Now = new Date();
      const expirationTime = new Date(expirationDate);

      if(!token){
       return;
      }

      if(Now >= expirationTime){
        localStorage.removeItem('token');
        localStorage.removeItem('Id');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('username');
        router.push('/login');
      }

      commit('authUser', {
        token: token,
        userId: user_id,
        username: username
      })
      
    }
   
  },

  getters: {
    getPosts: state => {
      return state.posts
    },
    isAuthenticated(state){
      return state.token !== null;
    },
    getUsername(state){
      return state.username;
    }
  }
})
