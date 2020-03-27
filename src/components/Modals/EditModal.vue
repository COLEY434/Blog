<template>
  <!-- Modal for editing posts-->
<div class="modal fade" id="EditCommentBox" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Editing post</h5>
        <button type="button" class="close" data-dismiss="modal"  @click="clearSuccessMessage()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <form @submit.prevent="EditPost()">
             <p class="text-success" v-if="success">{{successMessage}}</p>
                  <textarea v-model="editMessage" style="width: 100%" id="message1" cols="73" rows="5">                     
                  </textarea>
                  <button type="submit" :disabled="!editMessage || totalWordLength >=500" style="float: right" class="btn btn-primary" id="postButton1">Update</button>
                   
        
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
    watch: {
        EditMessage(newMessage){
            this.editMessage = newMessage
        },
        PostId(newPostd){
            this.postId = newPostd
        },
        editMessage(newValue){
            this.CountWords(newValue.length)
        }
    },
    props: {
        EditMessage: String,
        PostId: Number
    },
    data(){
        return{
            editMessage: this.EditMessage,
            postId: this.PostId,
            successMessage: '',
            success: false,
            totalWordLength: null
        }
    },
    methods: {

        CountWords(length){
            this.totalWordLength = length
        },
          EditPost(){      
            axiosInstance.put("/post/update", {
                post_Id: this.postId,
                message: this.editMessage
            })
            .then((response) => {
                var data = response.data;
                if(data.success){
                    this.successMessage = data.message;
                    this.success = true;
                    this.editMessage = '';
                     setTimeout(()=> {
                        this.successMessage = null;
                        this.success = false;
                        $('#EditCommentBox').modal('hide');
                    }, 3000)
                    this.$store.dispatch('getAllPost');
                }
                
            })
            .catch((error) => {
                console.log(error);
            })
        },
        clearSuccessMessage(){
            this.successMessage = null
        }
    }
}
</script>

<style>

</style>