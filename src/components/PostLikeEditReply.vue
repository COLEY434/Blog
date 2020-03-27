<template>
  <div style="border-top: 1px solid #0B615E;">
      <!-- Contains the edit, like and reply button etc -->
        <div>
            <span class="bkc ml-5" @click="$emit('loadPostReplies', postId, username)">Replies</span>
            <span class="bkc ml-5"><a data-toggle="modal" @click="$emit('setReplyInfo', postId, username)" data-target="#replybox">Reply</a></span>
            <span class="bkc ml-5" v-if="userId === storeUserId"><a data-toggle="modal"  @click="$emit('setEditInfo', postId, postMessage)" data-target="#EditCommentBox">Edit</a></span>
            <span class="bkc ml-5" v-if="isliked" @click="likePost(postId, storeUserId)"><i style="cursor: pointer" class="text-danger fas fa-heart"></i></span>
            <span class="bkc ml-5" v-else @click="likePost(postId, storeUserId)"><i style="cursor: pointer" class="far fa-heart"></i></span>    
        </div>  
  </div>
</template>

<script>
import { axiosInstance } from "../Api/axiosConfig";
export default {
    props: {
        postId: Number,
        username: String,
        userId: Number,
        postMessage: String,
        storeUserId: Number, 
        likes: Array
    },
    data(){
        return{
            //likes: this.$store.state.likes,
            liked: false,
        }
    },
    created(){
        const Like = this.likes.filter(like => Number(like.post_Id) == this.postId && Number(like.user_Id) == this.storeUserId)
        const isLiked = Like.length === 0 ? false : Like[0].liked
        this.liked = isLiked
    },
    computed: {
      isliked(){
        return this.liked
      },
    //    getLikes(){
    //     return this.$store.getters.getLikes;
    // }
    },
    watch: {
      liked(newLikedStatus){
          this.Liked = newLikedStatus
      },
      // getLikes(newLikes){
      //       this.likes = newLikes
      //   }
    },
    methods: {
      likePost(postId, UserId){
        axiosInstance.post('/likes/like-post/' + Number(postId) + "/" + Number(UserId))
              .then((response) => {
                const { success } = response.data
                if(success){
                  this.liked = true
                  this.$store.dispatch("getAllLikes")
                }
                if(!success){
                  this.liked = false
                  this.$store.dispatch("getAllLikes")
                }
              })
                .catch((err) => console.log(err))
      }
    }
}
</script>

<style>
@media only screen and (max-width: 320px) {
  .bkc {
    margin-left: 0px !important;
  }
}
</style>