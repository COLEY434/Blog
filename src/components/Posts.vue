<template>
  
    
  <div class="container">
      <div class="row" style="margin-top: 5px">
          <div class="col-md-6 offset-md-2">
              <form @submit.prevent="Post">
                  <textarea v-model="message" style="width: 100%" id="message" cols="73" rows="5" placeholder="Hey, What's on your mind?">
                      
                  </textarea>
                  <button type="submit" :disabled="!message" class="btn btn-primary" id="postButton">Post</button>
              </form>
          </div>
      </div>


      <div class="row" style="margin-top: 100px;">
          <div class="col-md-7 offset-md-2">
               <router-view :posts="posts"></router-view>  
          </div>
      </div> 
  </div>
  

</template>


<script>
import axios from 'axios'
export default {
data(){
    return {      
        message: '', 
        posts: this.$store.state.posts 
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
    }
},
methods: {
    fetchData(){
        axios.get('https://localhost:44318/api/post/get-posts')
            .then((response) => {  
                const data = response.data; 
                //console.log(data);
                const result = [];  
                for(let post in data){ 
                    result.unshift(data[post]); 
                }
                console.log("asa" + result);
                this.posts = result;
        })
        .catch((error) => {
        console.log(error);
        });
    },
    Post(){
       const userData = { user_Id: Number(this.$store.state.userId), message: this.message }
        this.$store.dispatch('sendPost', userData);
        this.message = null;
        
    }

}
}
</script>

<style scoped>
 #postButton {
        float: right;
        padding: 5px 30px;     
    }  
</style>