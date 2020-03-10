<template>
    <div class="row">
      <div class="col-md-5">
          <div style="border: 1px solid black">
              <!-- <img src="http://127.0.0.1:8887/ProfilePictures/5-Profile_Pics-photo-of-person-s-hand-with-blue-light-3345270.jpg" alt="">  -->
              <!-- <img :src="pic" alt=""> -->
             <img class="img-fluid" style="width: 70px; height: 70px; border-radius: 50%" :src="imgUrl" alt="">
              <!--<i v-else class="fas fa-user" style="font-size: 300px; margin-left: 70px;"></i> -->
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
              <i style="font-size: 50px; cursor: pointer" @click="selectImage()" class="fas fa-camera"></i>
              <b style="cursor: pointer" @click="selectImage()">Upload Profile Picture</b>
          </div>
          <form id="imageUploadForm" enctype="multipart/form-data" style="display: none">
              <input type="file" name="Photo" v-on:change="UploadImage()" id="upload">
          </form>
      </div>
    </div>
  
</template>

<script>
import { axiosInstance } from '../../Api/axiosConfig';

export default {
created(){
    const UserID = this.$store.state.userId;
    this.userId = UserID;
   // console.log(UserID);
    axiosInstance.get('/user/' + UserID)
        .then((response) => {
            console.log(response.data);
            this.UserInfo = response.data;
            this.pic = response.data.img_url;
            this.$store.dispatch('ProfileData', response.data)
        }) 
        .catch((error) => console.log(error));
},

computed: {
   imgUrl(){
       return this.pic;
   }

},

watch: {
    pic: function(newImgUrl){
        this.pic = newImgUrl;
    }
},
data(){
    return {
        UserInfo: {},
        userId: null,
        pic: null
    }
},

methods: {
    selectImage(){
        document.getElementById("upload").click();
    },
    UploadImage(){ 
        const pic = document.getElementById("upload").value;
        const myForm  = document.getElementById("imageUploadForm");
        if(pic === undefined){
            return;
        }
        let forminfo = new FormData(myForm);
        const userID = Number(this.userId);
        axiosInstance.post('/user/upload-image/' + userID,
            forminfo,
           { headers: { 'Content-Type': 'multipart/form-data' }}
        )
        .then((response) => {
            console.log(response.data);
            this.pic = response.data.pic;
            
        }) 
            .catch((error) => console.log(error));
    }
}
}
</script>

<style scoped>
    
</style>