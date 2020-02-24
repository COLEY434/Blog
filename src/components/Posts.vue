<template>  
  <div class="container">
      <div class="row" style="margin-top: 5px">
          <div class="col-md-7 offset-md-2 card">
              <form @submit.prevent="Post">
                  <textarea v-model="message" style="width: 100%" id="message" cols="73" rows="0" placeholder="Hey, What's on your mind?">
                      
                  </textarea>
                  <button type="submit" :disabled="!message || totalWordLength >=500" class="btn btn-primary" id="postButton">POST</button>
              </form>
          </div>
      </div>

 
      <div class="row" style="margin-top: 100px;">   
            <router-view :posts="posts"></router-view>   
      </div> 
  </div>
  

</template>


<script>
import axios from 'axios'
export default {
 mounted(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token;
   
  },
data(){
    return {      
        message: '', 
        posts: this.$store.state.posts ,
        totalWordLength: null
    } 
},
computed: { 
    getPost(){
        return this.$store.getters.getPosts;
    }
},

watch: {
    getPost(newPost){
        this.posts = newPost;
    },
    message(newValue){
            this.CountWords(newValue.length)
    }
},
methods: {
     CountWords(length){
            this.totalWordLength = length
        },
    Post(){
       const userData = { user_Id: Number(this.$store.state.userId), message: this.message }
        this.$store.dispatch('sendPost', userData);
        this.message = '';    
    },

}
}
</script>

<style scoped>
 #postButton {
        float: right;
        padding: 5px 30px;     
    }  
</style>