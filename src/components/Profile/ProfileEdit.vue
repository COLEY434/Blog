<template>
<div class="container">
  <div class="row">
    <div class="col-md-7 offset-md-2 col-sm-10 offset-sm-1">
       <button class="btn btn-info" @click="goBack">Go Back</button><br><br>
       <center><h2 style="color: white">Profile Edit</h2></center>

        <div id="imdDisplayer" style="position: relative">
            <center>
            <img :src="UserData.img_url" id="img" style="opacity: 0.5; max-height: 300px; border-radius: 5px" class="img-fluid" alt="profile-image"> <br>
            <span style="cursor: pointer" @click="SelectPhoto()"><i style="color: white; opacity: 0.6; font-size: 100px;" class="fas fa-camera"></i></span>  
            </center>         
        </div>

            <div>
                 <form @submit.prevent="EditProfile(Number(UserData.userId))" enctype="multipart/form-data" id="imageUploadForm">
                <p v-if="!success" id="errorMessage" style="color: red; background-color: white; padding: 5px; display: none"><b>{{ successMessage }}</b></p>
                    <div class="form-group">    
                        <input type="file" class="form-control" name="Photo" v-on:change="UploadImage($event)" id="Photo" style="display: none">
                    </div>
                    <div class="form-group">    
                        <label for="surname" id="label-text">Surname</label>
                        <input type="text" class="form-control" name="Surname" :value="UserData.surname" id="surname" placeholder="Surname">
                    </div>
                    <div class="form-group">
                        <label for="Firstname" id="label-text">Firstname</label>
                        <input type="text" class="form-control" name="Firstname" :value="UserData.firstname" id="Firstname" placeholder="Firstname">
                    </div>
                    <div class="form-group">
                        <label for="Username" id="label-text">Username</label>
                        <input type="text" class="form-control" name="Username" :value="UserData.username" id="Username" placeholder="Username">
                    </div>
                     <div class="form-group">
                        <label for="Email" id="label-text">Email</label>
                        <input type="email" class="form-control" name="Email" :value="UserData.email" id="Email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="Country" id="label-text">Country</label>
                        <input type="text" class="form-control" name="Country" :value="UserData.country" id="Country" placeholder="Country">
                    </div>
                
                <button v-if="!loading" type="submit" class="btn btn-primary float-right">Update</button>
                 <button v-else class="btn btn-success float-right" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Updating...
                </button>
            </form>
  
            </div>
    </div>
  </div>
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
        successMessage: '',
        loading :false
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
        if(file.length == 0){
            return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          document.getElementById("img").src = e.target.result    
        }
        reader.readAsDataURL(file)      
    },
    EditProfile(userId){
        this.loading = true
        let myForm =  document.getElementById('imageUploadForm')
        let formData = new FormData(myForm);

        axiosInstance.post(`/user/edit-profile/${userId}`,
                         formData)
                    .then((response) => {
                        const { success, userData, message } = response.data
                        if(success){
                            this.loading = false
                            this.$store.dispatch('SetUsername', userData.username)
                            this.$store.dispatch('ProfileData', userData)
                            this.$router.push(`/profile/${userId}`)
                        }
                        if(!success){
                            this.loading = false
                            document.getElementById("errorMessage").style.display = "block"
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