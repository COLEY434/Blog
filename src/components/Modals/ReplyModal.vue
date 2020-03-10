<template>
  <!-- Modal for replying comments-->
<div class="modal fade" id="replybox" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" v-if="postUsername" id="exampleModalCenterTitle">Replying to @{{ postUsername }}</h5>
        <h5 class="modal-title" v-if="!postUsername" id="exampleModalCenterTitle">Replying to Annonymous</h5>
        <button type="button" class="close" data-dismiss="modal" @click="clearSuccessMessage()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <p class="text-success" v-if="success">{{successMessage}}</p>
         <form @submit.prevent="PostReply()">
                  <textarea v-model="replyMessage" style="width: 100%" id="message2" cols="73" rows="5">
                      
                  </textarea>
                  <button type="submit" :disabled="!replyMessage || totalWordLength >=500" class="btn btn-success" id="postButton2">Reply</button>
         </form>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { axiosInstance } from "../../Api/axiosConfig";
import $ from 'jquery'
export default {
    props: {
        PostUsername: String,
        PostId: Number,
    },
    watch:{
        PostUsername(newPostUsername){
            this.postUsername = newPostUsername
        },
        PostId(newPostd){
            this.postId = newPostd
        },
        replyMessage(newValue){
            this.CountWords(newValue.length)
    }
    },
    data(){
        return {
            replyMessage: '',
            success: false,
            successMessage: '',
            postUsername: null,
            postId: null,
            userId: Number(this.$store.state.userId),
            totalWordLength: null
        }
    },
    methods: {
        CountWords(length){
            this.totalWordLength = length
        },
        clearSuccessMessage(){
            this.successMessage = null
        },
        PostReply(){
            axiosInstance.post("/post/reply/create", {
                post_Id: this.postId,
                message: this.replyMessage,
                user_Id: this.userId
            })
            .then((response) => {
                var data = response.data;
                if(data.success){
                    this.successMessage = data.message;
                    this.success = true;
                    this.replyMessage = null;
                    setTimeout(()=> {
                        this.successMessage = null;
                        this.success = false;
                        $('#replybox').modal('hide');
                    }, 3000)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
    }

}
</script>

<style>

</style>