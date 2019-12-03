<template>
  <div>
    <div v-for="(post, index) in posts" :key="index" class="posts row">
        <div class="userimg-box">
            <img v-if="post.img_url == null" src="../assets/images/download.png" id="poster-icon" alt="">
            <!-- <img v-if="post.img_url" src="post.img_url" id="poster-icon" alt=""> -->
        </div>
         <div class="usercomment-box">
            <div class="mt-2">
                <span class="ng pl-2">Posted: {{ post.date_posted }}</span>
                <span class="reply-view-likes" style="float: right; margin-right: 15px;" v-if="!post.isLiked"><i style="cursor: pointer" @click="change(post.Id)" class="far fa-heart"></i></span>
                <span class="reply-view-likes" style="float: right; margin-right: 15px;" v-else><i style="cursor: pointer" @click="change(post.Id)" class="text-danger fas fa-heart"></i></span>
                <p class="pl-2" v-if="post.username">{{ post.username }}</p>
                <p class="pl-2" v-if="!post.username">Anonymous</p>
                <p class="pl-2 mt-n2" v-if="post.date_updated">Updated: {{ post.date_updated }}</p>
            </div>
                      
             <div class="pl-2">
                <p>
                    {{ post.message }}
                </p>
            </div>
            <div class="pl-2">
                <span class="bkc" @click="loadPostReplies(post.id, post.username)">View Replies</span>
                <span class="bkc pl-4"><a data-toggle="modal" @click="setReplyInfo(post.id, post.username)" data-target="#replybox">Reply</a></span>
                <span class="bkc pl-4"><a data-toggle="modal" v-if="Number(post.userId) === Number($store.state.userId)" @click="setEditInfo(post.id, post.message)" data-target="#EditCommentBox">Edit</a></span>
            
            </div>

        </div>              
                 
    </div>




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
          <p class="text-success" v-if="successMessage">{{successMessage}}</p>
         <form @submit.prevent="PostReply">
                  <textarea v-model="replyMessage" style="width: 100%" id="message" cols="73" rows="5">
                      
                  </textarea>
                  <button type="submit" :disabled="!replyMessage" class="btn btn-primary" id="postButton">Post</button>
                  <button type="button" class="btn btn-secondary" @click="clearSuccessMessage()" data-dismiss="modal">Close</button>
         </form>
      </div>
    </div>
  </div>

</div>



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
             <p class="text-success" v-if="successMessage">{{successMessage}}</p>
                  <textarea v-model="editMessage" style="width: 100%" id="message" cols="73" rows="5">
                      { editMessage }
                  </textarea>
                  <button type="submit" :disabled="!editMessage" class="btn btn-primary" id="postButton">Edit</button>
                  <button type="button" class="btn btn-secondary" @click="clearSuccessMessage()" data-dismiss="modal">Close</button>
         </form>
      </div>
    </div>
  </div>

</div>
</div>
</template>

<script>
import axios from "axios";
export default {
    data(){ 
        return {
            replyMessage: null,
            editMessage: '',
            postId: null,
            postUsername: null,
            successMessage: null
        }
    },
    props: ['posts'],
    methods: {
         change(e){
           // this.posts.isLiked = !this.post.isLiked;
          const selected =  this.posts.filter(x => x.id == e);

                console.log(e);
                
                selected[0].isLiked = !selected[0].isLiked;
                
                console.log(selected);  
        },
        clearSuccessMessage(){
            this.successMessage = null;
        },
        EditPost(){      
            axios.put("https://localhost:44318/api/post/update", {
                post_Id: Number(this.postId),
                message: this.editMessage
            })
            .then((response) => {
                var data = response.data;
                if(data.success){
                    this.successMessage = data.message;
                    this.editMessage = null;
                    this.$store.dispatch('getAllPost');
                }
                
            })
            .catch((error) => {
                console.log(error);
            })
        },
        PostReply(){
            axios.post("https://localhost:44318/api/post/reply/create", {
                post_Id: Number(this.postId),
                message: this.replyMessage,
                user_Id: Number(this.$store.state.userId)
            })
            .then((response) => {
                var data = response.data;
                if(data.success){
                    this.successMessage = data.message;
                    this.replyMessage = null;
                }
            })
            .catch((error) => {
                console.log(error);
            })
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
            console.log(PostId + ' ' + PostUsername);
            this.$router.push('posts/' + postUsername + '/post');
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
    .ng {
        padding-left: 3px;
    }
    .userimg-box {
        width: 75px;
        float: left;
    }
    .usercomment-box {
        width: 557px;
        float: right;
        border-bottom: 2px solid black;
    }
    #username {
        width: 50px;
        border: 1px solid black; 
    }
    
    .bkc {
    cursor: pointer;
}

.reply-view-likes{
        float: right;
        margin-right: 15px;
    }

    #postButton {
        float: right;
        padding: 5px 30px;
       
    }
</style>