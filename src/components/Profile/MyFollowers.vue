<template>
<div>
  <center v-if="loading">
     <div class="spinner-border" style="width: 7rem; height: 7rem; color: white" role="status">
        <span class="sr-only">Loading...</span>
      </div>
  </center>
  <div v-else>
    <Followers v-if="success" :Users="getUsers"></Followers>
    <div v-else>
      <h2 style="color: white">{{ message }}</h2>
    </div>
  </div>
  
</div>
</template>

<script>
import { axiosInstance } from '../../Api/axiosConfig'
import Followers from './Follwing-Followers'
export default {
  data(){
    return {
    users: [],
    message: "",
    success: false,
    loading: true
    }
  },
 watch : {
    getUsers(newUSers){
      this.users = newUSers
    },
    userId(newUserId){
      this.GetFollowers(newUserId)
    }
  },
computed: {
    getUsers(){
      return this.users
    }
  },
components: {
  Followers
},
props: {
  userId : Number
},

created(){
  this.GetFollowers(this.userId)
},

methods: {
  GetFollowers(userId){
    axiosInstance.get(`/follow/get-followers/${userId}`)
    .then((response) => {
        const {success, message, followers} = response.data
        if(success){
          this.loading = false
          this.success = true
          this.users = followers
          
        }
        if(!success){
          this.loading = false
          this.false = false
          this.message = message
        }      
    })
    .catch((err) => {console.log(err)})
  }
}
}
</script>

<style>

</style>