import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    posts: [],
    dateTime: null,
    updatedDateTime: null
  },
  mutations: {
    setId(state, Id){
      state.userId = Id
    },
    storePosts(state, payload){
      state.posts = payload
    }
  },
  actions: {
    setId({commit}, userID){
      commit('setId', userID);
    },
    sendPost(context,userData){
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
              console.log(result);
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
    tryAutoLogin({commit}){
      const user_id = localStorage.getItem('userId');
      if(!user_id){
        return
      }
      commit('setId', user_id);
    }
   
  },
  getters: {
    getPosts: state => {
      return state.posts
    }
  }
})
