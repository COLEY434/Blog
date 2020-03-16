<template>
<div>
  <h1 style="color: white">Following</h1>
  <Following v-if="getUsers" :Users="getUsers"></Following>
  <div v-else>
    No followings
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
    message: ""
    }
  },
 watch : {
    getUsers(newUSers){
      this.users = newUSers
    }
  },
computed: {
    getUsers(){
      return this.users
    }
  },
props: {
  userId : Number
},
  created(){
  axiosInstance.get(`/follow/get-followings/${this.userId}`)
    .then((response) => {
        const {success, message, followings} = response.data
        if(success){
          this.users = followings
          this.message = message
        }
        if(!success){
          this.message = message
        }      
    })
    .catch((err) => {console.log(err)})

}
}
</script>

<style>

</style>