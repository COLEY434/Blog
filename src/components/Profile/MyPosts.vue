<template>
<div>
  <center  v-if="loading">
    <div class="spinner-border" style="width: 7rem; height: 7rem; color: white;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </center>
    

  <div v-else>
     <div v-if="success">
      <div  class="row" v-for="(post, index) in posts" :key="index" style="border: 1px solid white; margin-bottom: 7px; border-radius: 5px">
        <div class="col-md-12" style="padding-left: 0px; padding-right: 0px">
          <div style="border-bottom: 1px solid white;">
            <span style="float: right; cursor: pointer" v-if="user_Id === Number($store.state.userId)" @click="RemovePost(post.id)" class="color">Delete</span>
            <span class="color"><small><b>Dated Posted:</b> {{ post.created_at }}</small></span><br>
            <span class="color"><small><b>Dated Updated:</b> {{ post.updated_at }}</small></span>
          </div>
            <p class="color" style="padding: 5px">{{ post.message}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 style="color: white">{{ message }}</h2>
    </div>
  </div>
</div>
</template>

<script>
import { axiosInstance } from '../../Api/axiosConfig'
export default {
props : {
  userId: Number
},
watch: {
  userId(newId){
    this.user_Id = newId
    this.GetUserPost(this.user_Id)
  }
},
data(){
  return {
    posts: [],
    user_Id: this.userId,
    success: false,
    message: "",
    loading: true
  }
},
created(){
  this.GetUserPost(this.userId)
},
methods: {
  GetUserPost(userId){
    axiosInstance.get('/post/user/' + userId)
      .then((response) => {
          const { success, message, posts } = response.data
          if(success){
            this.success = true
            this.posts = posts
            this.loading = false
          }
          if(!success){
            this.success = false
            this.message = message
            this.loading = false
          }

      })
        .catch((err) => console.log(err))
  },

  RemovePost(PostId){
    if(window.confirm("Do you want to delete this post?")){
      axiosInstance.delete('/post/delete/' + PostId)
      .then((response) => {
        const { success, message } = response.data

        if(success){
          alert(message)
        }
      })
        .catch((err) => console.log(err))
      return
    }
    
  }
}
}
</script>

<style>
.color {
  color: white;
}
</style>