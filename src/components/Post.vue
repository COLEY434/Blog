<template>
  <div  class="col-md-7 offset-md-2">
    <div v-for="(post, index) in blogPosts" :key="index" class="row card mb-2">
        <!-- contains the usernamwe, date posted, and updated plus user icon -->
        <div class="col-md-12" style="margin: 0px;">
            <div style="float: left" class="pl-2 pt-2">
                <img src="../assets/images/download.png" class="img-fluid" id="poster-icon" alt="">
            </div>

             <div class="mt-2" style="">
                <span style="float: right; margin-right: 15px;" v-if="Number(post.userId) === Number($store.state.userId)"><i style="cursor: pointer" data-toggle="modal" data-target="#DeletePost" @click="setPostIdToDelete(post.id)" class="text-danger fas fa-trash-alt"></i></span>
                 <span class="pl-2" v-if="post.username"><small>{{ post.username }}</small></span>
                <span class="pl-2" v-if="!post.username"><small>Anonymous</small></span><br>
                <span class="pl-2 card-text"><small class="text-muted">Posted: {{ post.date_posted }}</small></span><br>
                <span class="pl-2" v-if="post.date_updated"><small class="text-muted">Updated: {{ post.date_updated }}</small></span>
                
            </div>
        </div>


        <!-- contains the post message -->
        <div class="pl-2 pr-2 pt-2" style="background-color: black">
            <p style="color: #0B2161; white-space: pre-line; font-size: 14px">
                {{ post.message }}
            </p>
        </div>
                   
             <PostLikeEditReply :storeUserId="Number($store.state.userId)" v-on:loadPostReplies="loadPostReplies" v-on:setReplyInfo="setReplyInfo" v-on:setEditInfo="setEditInfo" :postId="post.id" :username="post.username" :userId="post.userId" :postMessage="post.message"/>    
    </div>
<!-- Component for editing posts-->
    <EditModal 
    :EditMessage="editMessage" 
    :PostId="Number(postId)"
    />

 <!-- Component for replying comments-->
   <ReplyModal :PostUsername="postUsername" :PostId="postId"/>

<!-- Modal for deleting post -->
<div class="modal fade" id="DeletePost" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <p id="successMessage"></p>
    <div id="content">
        <center><h5 class="modal-title" id="exampleModalCenterTitle">Are you sure you want to delete this post?</h5></center>
      </div>
      <div class="modal-body">
        <center> 
        <button class="btn btn-danger" @click="closeModal" id="postButton1">NO</button>
        <button class="btn btn-success" @click="DeletePost" id="postButton1">YES</button><br>
        </center>
      </div>
    
    </div>
  </div>

</div>

<!-- Success message modal -->
<div class="modal fade" id="Success" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <p id="successMessage"></p>
      <div class="modal-body">
        <center> 
            <p v-if="success" style="color: green">{{ successMessage}}</p>
            <p v-else style="color: red">{{ successMessage}}</p>
        </center>
      </div>
    
    </div>
  </div>

</div>


</div>
</template>

<script>
import axios from "axios";
import PostLikeEditReply from './PostLikeEditReply'
import EditModal from './Modals/EditModal'
import ReplyModal from './Modals/ReplyModal'
import $ from 'jquery'
export default {
    data(){ 
        return {
            editMessage: '',
            postId: null,
            postUsername: null,
            success: false,
            successMessage: null,
            blogPosts: this.posts
        }
    },
    watch: {
        posts(newBlogPost){
            this.blogPosts = newBlogPost
        }
    },
    components: {
        PostLikeEditReply,
        EditModal,
        ReplyModal
    },
    props: ['posts'],
methods: {
    setPostIdToDelete(postId){
        this.postId = postId
        },
    DeletePost(){
        axios.delete('https://localhost:44318/api/post/delete/' + Number(this.postId))
                .then((response) => {
                    const {success, message} = response.data;   
                    if(success){
                        this.success = success
                        this.successMessage = message
                        const newPosts = this.blogPosts.filter(post => post.id !== Number(this.postId))
                        this.$store.dispatch('RemoveDeletedPost', newPosts)
                        $('#DeletePost').modal('hide');
                        $('#Success').modal('show');
                         setTimeout(() => {                         
                            $('#Success').modal('hide');
                            }, 3000)
                    }
                    if(!success){
                        this.success = success
                        this.successMessage = message
                        $('#DeletePost').modal('hide');
                        $('#Success').modal('show');
                         setTimeout(() => {                         
                            $('#Success').modal('hide');
                            }, 3000)
                    }
                })
                 .catch((err) => console.log(err));
        }, 
    closeModal(){
        $('#DeletePost').modal('hide');
    },      
    setEditInfo(Id, message){
        this.postId = Id;    
        this.editMessage = message;  
    },

    setReplyInfo(Id, username){
        this.postUsername = username;
        this.postId = Id;      
    },

    loadPostReplies(PostId, PostUsername){
        const postUsername = PostUsername == null ? 'Anonymous' : PostUsername;
        axios.get("https://localhost:44318/api/post/get-comments/" + PostId)
                .then((response) => {
                    const data = response.data;
                    if(data.success){
                        this.$store.dispatch('getComments', data.comments);
                        this.$router.push('posts/' + postUsername + '/comments');
                    }
                    
                })
                    .catch((error) => console.log(error));
    }
    }
}
</script>







<style>
    #message {
        border-radius: 5px;
        padding: 3px 5px;
        margin-top: 10px;
    }

    #message2 {
        border-radius: 5px;
        padding: 3px 5px;
        margin-top: 10px;
    }
    .posts {
       
        padding: 6px;
    }
    #poster-icon{
        width: 50px;
        height: 50px;   
    }
    .content {
        padding-left: 4px;
    }

    #username {
        width: 50px;
        border: 1px solid black; 
    }
    
    .bkc {
    cursor: pointer;
}

    #postButton1 {
        padding: 5px 30px;
        margin: 3px;
       
    }

     #postButton2 {
        float: right;
        padding: 5px 30px;
       
    }
</style>