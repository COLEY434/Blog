<template>
  <div>
    <div v-for="(post, index) in posts" :key="index" class="posts row">
        <div class="userimg-box">
            <img src="../assets/images/download.png" id="poster-icon" alt="">
        </div>

         <div class="usercomment-box">
            <div class="mt-2">
                <span class="ng pl-2">Posted: {{ post.date }}</span>
                <span class="reply-view-likes" style="float: right; margin-right: 15px;" v-if="!post.isLiked"><i style="cursor: pointer" @click="change(post.id)" class="far fa-heart"></i></span>
                <span class="reply-view-likes" style="float: right; margin-right: 15px;" v-else><i style="cursor: pointer" @click="change(post.id)" class="text-danger fas fa-heart"></i></span>
                <p class="pl-2">{{ post.username }}</p>
                <p class="pl-2 mt-n2">Updated: {{ post.updated }}</p>
            </div>
                      
             <div class="pl-2">
                <p>
                    {{ post.message }}
                </p>
            </div>
            <div class="pl-2">
                <span class="bkc" @click="loadPostReplies(post.id, post.username)">View Replies</span>
                <span class="bkc pl-4"><a data-toggle="modal" @click="getPostId(post.id, post.username)" data-target="#replybox">Reply</a></span>
            </div>

        </div>              
                 
    </div>




<!-- Modal for replying comments-->
<div class="modal fade" id="replybox" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Replying to @{{ postUsername }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <form @submit.prevent="PostReply">
                  <textarea v-model="replyMessage" style="width: 100%" id="message" cols="73" rows="5">
                      
                  </textarea>
                  <button type="submit" class="btn btn-primary" id="postButton">Post</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
         </form>
      </div>
    </div>
  </div>

</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            replyMessage: '',
            postId: null,
            postUsername: null,

            posts: [
                {
                    id: 1,
                    message: "Amazon Simple Storage Service is storage for the Internet. It is designed to make web-scale computing easier for developers. Amazon S3 has a simple web services interface that you can use to store and retrieve any amount of data, at any time, from anywhere on the web. It gives any developer access to the same highly scalable, reliable, fast, inexpensive data storage infrastructure that Amazon uses to run its own global network of web sites. The service aims to maximize benefits of scale and to pass those benefits on to developers.",
                    date: "04-11-2019",
                    updated: "14-11-2019",
                    username: "SantasCruz",
                    isLiked: false

                },
                {
                    id: 2,
                    message: "I like unit testin but the issue with is that it can be very difficult to understand atimes. This guide explains the core concepts of Amazon S3, such as buckets and objects, and how to work with these resources using the Amazon S3 application programming interface (API).",
                    date: "04-11-2019",
                    updated: "14-11-2019",
                    username: "Coley02",
                    isLiked: false
                    
                },
                {
                    id: 3,
                    message: "I like unit testin but the issue with is that it can be very difficult to understand atimes. It gives any developer access to the same highly scalable, reliable, fast, inexpensive data storage infrastructure that Amazon uses to run its own global network of web sites. ",
                    date: "04-11-2019",
                    updated: "14-11-2019",
                    username: "disaster89",
                    isLiked: false
                    
                }
            ]
        }
    },

    methods: {
         change(e){
           // this.posts.isLiked = !this.post.isLiked;
          const selected =  this.posts.filter(x => x.id == e);

                console.log(e);
                
                selected[0].isLiked = !selected[0].isLiked;
                
                console.log(selected);
     
             
        },
        PostReply(){
            console.log(this.replyMessage);
        },
        getPostId(Id, username){
            this.postUsername = username;
            this.postId = Id;
            console.log(this.postUsername + ' ' + this.postId);
        },

        loadPostReplies(PostId, PostUsername){
            console.log(PostId + ' ' + PostUsername);
            this.$router.push('posts/' + PostUsername + '/post');
        }
    }
}
</script>







<style scoped>
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