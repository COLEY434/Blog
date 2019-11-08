<template>
  
    
  <div class="container">
      <div class="row" style="margin-top: 5px">
          <div class="col-md-6 offset-md-2">
              <form @submit.prevent="Post">
                  <textarea v-model="message" style="width: 100%" id="message" cols="73" rows="5" placeholder="Hey, What's on your mind?">
                      
                  </textarea>
                  <button type="submit" class="btn btn-primary" id="postButton">Post</button>
              </form>
          </div>
      </div>


      <div class="row" style="margin-top: 100px;">
          <div class="col-md-7 offset-md-2">
               <router-view></router-view>  
          </div>
      </div> 
  </div>
  

</template>


  


<script>
export default {

    data(){
        return {      
            message: '',     
        }
    },
    methods: {
        Post(){
            const dateobj = new Date();
            const date = dateobj.getDate();
            const month = dateobj.getMonth() + 1;
            const year = dateobj.getFullYear();
           const userData = {
                id: 4,
                date: date + '-' + month + '-' + year,
                message: this.message,
                updated: date + '-' + month + '-' + year,
                isLiked: false
            }
            this.posts.unshift(userData);
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