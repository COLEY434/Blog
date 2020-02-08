<template>
  <div>
      <!-- Contains the edit, like and reply button etc -->
        <div class="pl-2" style="background-color: cyan">
            <span class="bkc" @click="loadPostReplies(postId, username)">View Replies</span>
            <span class="bkc pl-4"><a data-toggle="modal" @click="$emit('setReplyInfo', postId, username)" data-target="#replybox">Reply</a></span>
            <span class="bkc pl-4"><a data-toggle="modal" v-if="userId === storeUserId" @click="$emit('setEditInfo', postId, postMessage)" data-target="#EditCommentBox">Edit</a></span>
            <span style="color: red" class="bkc pl-4"><a v-if="userId === storeUserId" @click="ToggleDeleteConfirmation(postId)" >Delete</a></span>
            <span style=""><i style="cursor: pointer" @click="change(postId)" class="text-danger fas fa-heart"></i></span>    
        </div>  
  </div>
</template>

<script>
export default {
    props: {
        postId: Number,
        username: String,
        userId: Number,
        postMessage: String,
        storeUserId: Number
    }
}
</script>

<style>

</style>