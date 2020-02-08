<template>
  <div  class="col-md-7 offset-md-2">
    <div v-for="(post, index) in posts" :key="index" class="row card mb-2">
        <!-- contains the usernamwe, date posted, and updated plus user icon -->
        <div class="col-md-12" style="margin: 0px;">
            <div style="float: left" class="pl-2 pt-2">
                <img src="../assets/images/download.png" class="img-fluid" id="poster-icon" alt="">
            </div>

             <div class="mt-2" style="">
                <span style="float: right; margin-right: 15px;" v-if="Number(post.userId) === Number($store.state.userId)"><i style="cursor: pointer" @click="change(post.Id)" class="text-danger fas fa-trash-alt"></i></span>
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
                   
             <PostLikeEditReply :storeUserId="Number($store.state.userId)" v-on:setReplyInfo="setReplyInfo" v-on:setEditInfo="setEditInfo" :postId="post.id" :username="post.username" :userId="post.userId" :postMessage="post.message"/>    
    </div>
<!-- Component for editing posts-->
    <EditModal 
    :EditMessage="editMessage" 
    :PostId="Number(postId)"
    />

 <!-- Component for replying comments-->
   <ReplyModal :PostUsername="postUsername" :PostId="postId"/>




<!-- Modal for deleting post -->
<div id="DeletePost" style="background-color: grey; color: black; display: none; padding: 8px; width: 450px; border: none; border-radius: 5px; z-index: 999px; position: absolute; top: 0px; left: 200px;">

        <h5>Are you sure you want to delete this post?</h5>
         <center>
         <span @click="DontDelete()" class="btn btn-success" style="cursor: pointer">No</span>&nbsp;&nbsp;&nbsp;
         <span @click="DeletePost()" class="btn btn-danger" style="cursor: pointer">Yes</span>
         </center>
</div>

<!-- Modal for showing successful deletion message -->
<div id="DeletePostSuccessMessage" class="bg-success" style="background-color: grey; color: black; display: none; padding: 8px; width: 450px; border: none; border-radius: 5px; z-index: 999px; position: absolute; top: 0px; left: 200px;">
        <center><h5 style="color: white" id="errorMessage">Post has been deleted successfully</h5></center>
</div>

</div>
</template>

<script>
import axios from "axios";
import PostLikeEditReply from './PostLikeEditReply'
import EditModal from './Modals/EditModal'
import ReplyModal from './Modals/ReplyModal'
export default {
    data(){ 
        return {
            editMessage: '',
            postId: null,
            postUsername: null,
        }
    },
    components: {
        PostLikeEditReply,
        EditModal,
        ReplyModal
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
        ToggleDeleteConfirmation(postId){
            this.postId = postId
            document.getElementById("DeletePost").style.display = "block"
        },
        DontDelete(){
            document.getElementById("DeletePost").style.display = "none"
        },
        DeletePost(){
          document.getElementById("DeletePost").style.display = "none"

          axios.delete('https://localhost:44318/api/post/delete/' + Number(this.postId))
                .then((response) => {
                    const {success, message} = response.data;
                    
                    // if(data.success == "true"){
                    //     console.log(data)
                    //     document.getElementById("DeletePostSuccessMessage").style.display = "block"
                    //      setTimeout(() => {
                    //         document.getElementById("DeletePostSuccessMessage").style.display = "none"
                    //         }, 5000)
                    // }
                    if(!success){
                        console.log(message)
                        document.getElementById("DeletePostSuccessMessage").style.backgroundColor = 'red';
                        document.getElementById("DeletePostSuccessMessage").style.color = "white"
                        document.getElementById("errorMessage").style.textContent = message
                        document.getElementById("DeletePostSuccessMessage").style.display = "block"
                    }
                })
                 .catch((err) => console.log(err));
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
        float: right;
        padding: 5px 30px;
       
    }

     #postButton2 {
        float: right;
        padding: 5px 30px;
       
    }
</style>