<template>
  <div class="col-md-7 offset-md-2">
      <button class="btn btn-info" @click="goBack">Go Back</button><br><br>
      

      <div v-for="(post, index) in comments" :key="index" class="row card mb-3">
        <div class="col-md-12" style="background-color: #0B615E">
          <div style="float: left" class="pl-2 pt-2">
              <img v-if="post.img_url" :src="post.img_url" id="poster-icon" alt="">
              <img v-else src="../assets/images/download.png" id="poster-icon" alt="">
          </div>
          <div class="mt-2" style="">
                  <span style="float: right; margin-right: 15px;" v-if="Number(post.userId) === Number($store.state.userId)"><i style="cursor: pointer" data-toggle="modal" data-target="#DeletePost" @click="setPostIdToDelete(post.id)" class="text-danger fas fa-trash-alt"></i></span>
                  <span class="pl-2" v-if="post.username"><small>{{ post.username }}</small></span>
                  <span class="pl-2" v-if="!post.username"><small>Anonymous</small></span><br>
                  <span class="pl-2 card-text"><small class="text-muted">Posted: {{ post.date_posted }}</small></span><br>
                  <span class="pl-2" v-if="post.date_updated"><small class="text-muted">Updated: {{ post.date_updated }}</small></span>
                  
          </div>
        </div>

        <div class="pl-2 pr-2 pt-2" style="background-color: black">
            <p style="color: white; white-space: pre-line; font-size: 14px">
                {{ post.message }}
            </p>
        </div>            
                 
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
             comments: [],
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
    },

    created(){
        this.comments = this.$store.state.comments;
            
   }
}
</script>

<style>
  
</style>