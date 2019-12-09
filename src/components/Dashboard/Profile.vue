<template>
    <div class="row">
      <div class="col-md-5">
          <div style="border: 1px solid black">
              <img v-if="UserInfo.img_url" src="" alt="">
              <i v-else class="fas fa-user" style="font-size: 300px; margin-left: 70px;"></i>
          </div>
        </div>
      <div class="col-md-7">
          <div>
              <b>Surname</b>: {{UserInfo.surname}} <br>
              <b>Firstname</b>: {{UserInfo.firstname}} <br>
              <b>Username</b>: {{UserInfo.username}} <br>
              <b>Email</b>: {{UserInfo.email}} <br>
              <b>Age</b>: {{UserInfo.age}} <br>
              <b>Gender</b>: {{UserInfo.gender}}<br>
              <b>State</b>: {{UserInfo.state}} <br>
              <b>Country</b>: {{UserInfo.country}} <br>
          </div>
          <div style="margin-top: 60px">
              <i style="font-size: 50px; cursor: pointer" @click="uploadPicture(UserInfo.userId)" class="fas fa-camera"></i>
              <b>Upload Profile Picture</b>
          </div>
          <form style="display: none">
              <input type="file" v-on:change="up()" id="upload">
          </form>
      </div>
    </div>
  
</template>

<script>
import axios from 'axios';
export default {
created(){
    const UserID = this.$store.state.userId;
    axios.get('https://localhost:44318/api/user/' + UserID)
        .then((response) => {
            console.log(response.data);
            this.UserInfo = response.data;
        }) 
            .catch((error) => console.log(error));
},

data(){
    return {
        UserInfo: {}
    }
},

methods: {
    uploadPicture(userId){
        console.log(userId);
        document.getElementById("upload").click();
    },
    up(){ 
        const pic = document.getElementById("upload").value;
        console.log(pic);
    }
}
}
</script>

<style scoped>
    
</style>