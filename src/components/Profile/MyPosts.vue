<template>
<div>
  <h1 style="color: white">My Posts!!!</h1>
  <div class="row" v-for="(post, index) in posts" :key="index" style="border-bottom: 1px solid white; margin-bottom: 7px">
    <div class="col-md-12 col-sm-12" style="border: 1px solid white; padding-left: 0px">
      <div>
        <span style="float: right" class="color">Delete</span>
        <span class="color"><small><b>Dated Posted:</b> {{ post.created_at }}</small></span><br>
        <span class="color"><small><b>Dated Updated:</b> {{ post.updated_at }}</small></span>
      </div>
        <p class="color">{{ post.message}}</p>
    </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props : {
    userId: Number
  },
  data(){
    return {
      posts: []
    }
  },
  mounted(){
    
     axios.get('https://blogapi.azurewebsites.net/api/post/user/' + this.userId)
        .then((response) => {
          //console.log(response.data)
            const data = response.data
            this.posts = data
        })
          .catch((err) => console.log(err))
  }
}
</script>

<style>
.color {
  color: white;
}
</style>