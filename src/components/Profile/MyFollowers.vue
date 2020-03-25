<template>
<div>
  <Followers v-if="getUsers" :Users="getUsers"></Followers>
  <div v-else>
    <h2 style="color: white">No Followers</h2>
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
    message: ""
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
          this.users = followers
          this.message = message
        }
        if(!success){
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