<template>
  <div>
      <button class="btn btn-info" @click="goBack">Go Back</button><br>
      

      <div v-for="(post, index) in posts" :key="index" class="posts row">
        <div class="userimg-box">
            <img src="../assets/images/download.png" id="poster-icon" alt="">
        </div>

         <div class="usercomment-box">
            <div class="mt-2">
                <span class="ng pl-2">Posted: {{ post.date }}</span>
                <p class="pl-2">{{ post.username }}</p>
            </div>
                      
             <div class="pl-2">
                <p>
                    {{ post.message }}...
                </p>
            </div>
            <div class="pl-2">
                <center><span class="bkc" data-toggle="modal" data-target="#showFullMessage" id="see-more" @click="seeMore(post.id)">See More</span></center><br>
            </div>

        </div>              
                 
    </div>




    <!-- Modal for showing full post message-->
<div class="modal fade" id="showFullMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {{ fullPostMessage }}
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
             posts: [],
             fullPost: [],
             fullPostMessage: null
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },

        seeMore(Id){
            console.log(this.fullPost);
            const fullPost = this.fullPost.filter(x => x.id == Id);

            this.fullPostMessage = fullPost[0].message;

            console.log(Id);
            console.log(fullPost);
        }
    },

    created(){
        
        const postData = [
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
                    message: "Amazon Simple Storage Service is storage for the Internet. It is designed to make web-scale computing easier for developers. Amazon S3 has a simple web services interface that you can use to store and retrieve any amount of data, at any time, from anywhere on the web. It gives any developer access to the same highly scalable, reliable, fast, inexpensive data storage infrastructure that Amazon uses to run its own global network of web sites. The service aims to maximize benefits of scale and to pass those benefits on to developers.",
                    date: "04-11-2019",
                    updated: "14-11-2019",
                    username: "coley02",
                    isLiked: false

                }
             ]
        this.fullPost = postData;

         for(let post of postData){
                const slicedPostMessage = post.message.slice(0, 100);

                const userPost = {
                    id: post.id,
                    message: slicedPostMessage,
                    date: post.date,
                    username: post.username,
                    isLiked: post.isLiked
                };
                this.posts.push(userPost);
            }
            console.log(this.fullPost);
   }
}
</script>

<style>
    #see-more {
        padding: 6px;
        background-color: rgb(12, 161, 161);
        color: rgb(253, 253, 253);
        border-radius: 4px;
    }
</style>