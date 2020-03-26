<template>
<div>
  <center v-if="loading">
     <div class="spinner-border" style="width: 7rem; height: 7rem; color: white" role="status">
        <span class="sr-only">Loading...</span>
      </div>
  </center>

  <div v-else>
    <Following v-if="success" :Users="getUsers"></Following>
    <div v-else>
      <h2 style="color: white">{{ message }}</h2>
    </div>
  </div>
</div>
  
  
</template>

<script>
import Following from './Follwing-Followers'
import { axiosInstance } from '../../Api/axiosConfig'
export default {
  components: {
    Following
  },
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
      this.GetFollowings(newUserId)
    }
  },
computed: {
    getUsers(){
      return this.users
    },
  },
props: {
  userId : Number
},
created(){
  this.GetFollowings(this.userId)
},

methods: {
  GetFollowings(userId){
    axiosInstance.get(`/follow/get-followings/${userId}`)
    .then((response) => {
        const {success, message, followings} = response.data
        
        if(success){
          this.loading = false
          this.success = true
          this.users = followings
          
        }
        if(!success){
          this.loading = false
          this.success = false
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