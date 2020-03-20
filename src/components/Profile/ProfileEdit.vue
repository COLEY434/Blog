<template>
<div>
    <button class="btn btn-info" @click="goBack">Go Back</button><br><br>
  <h2>Profile Edit</h2>
  <div class="row" id="imdDisplayer" style="position: relative">
       <img :src="UserData.img_url" id="img" style="opacity: 0.5" class="img-fluid" alt="profile-image">
       <span style="position: absolute; left: 100px; top: 100px; cursor: pointer" @click="SelectPhoto()"><i style="color: white; opacity: 0.6; font-size: 100px;" class="fas fa-camera"></i></span>
  </div>
  <div>
      <p v-if="success" style="color: red">{{ successMessage }}</p>
      <p v-else style="color: red">{{ successMessage }}</p>
  </div>
   <form @submit.prevent="EditProfile(Number(UserData.userId))" enctype="multipart/form-data" id="imageUploadForm">
                
                    <div class="form-group">    
                        <input type="file" class="form-control" name="Photo" v-on:change="UploadImage($event)" id="Photo" style="display: none">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">    
                        <label for="surname" id="label-text">Surname</label>
                        <input type="text" class="form-control" name="Surname" :value="UserData.surname" id="surname" placeholder="Surname">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Firstname" id="label-text">Firstname</label>
                        <input type="text" class="form-control" name="Firstname" :value="UserData.firstname" id="Firstname" placeholder="Firstname">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Username" id="label-text">Username</label>
                        <input type="text" class="form-control" name="Username" :value="UserData.username" id="Username" placeholder="Username">
                        <!-- <small>password does not match</small> -->
                    </div>
                     <div class="form-group">
                        <label for="Email" id="label-text">Email</label>
                        <input type="email" class="form-control" name="Email" :value="UserData.email" id="Email" placeholder="Email">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Country" id="label-text">Country</label>
                        <input type="text" class="form-control" name="Country" :value="UserData.country" id="Country" placeholder="Country">
                        <!-- <small>password does not match</small> -->
                    </div>
                
                <button type="submit" class="btn btn-primary float-right">Edit</button>
            </form>
  
</div>

</template>

<script>
import { axiosInstance } from '../../Api/axiosConfig';
export default {
created(){
    this.UserData = this.$store.getters.getUserData
},
data(){
    return {
        UserData: {},
        success: false,
        successMessage: ''
    }
},
watch: {
    getUserData(NewUserData){
        this.UserData = NewUserData
    }
},
computed: {
   getUserData(){
       return this.$store.getters.getUserData
   }
},
 methods: {
    goBack(){
        this.$router.go(-1);
    },
    SelectPhoto(){
        document.getElementById("Photo").click()
    },

    UploadImage(event){
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          document.getElementById("img").src = e.target.result    
        }
        reader.readAsDataURL(file)      
    },
    EditProfile(userId){
        let myForm =  document.getElementById('imageUploadForm')
        let formData = new FormData(myForm);

        axiosInstance.post(`/user/edit-profile/${userId}`,
                         formData)
                    .then((response) => {
                        const { success, userData, message } = response.data
                        if(success){
                            
                            this.success = true,
                            this.successMessage = message
                            this.$store.dispatch('SetUsername', userData.username)
                            this.$store.dispatch('ProfileData', userData)
                            this.$router.push(`/profile/${userId}`)
                        }
                        if(!success){
                            this.success = false,
                            this.successMessage = message
                        }
                        
                    })
                    .catch((err) => console.log(err))
    }
    },

}
</script>

<style>

</style>