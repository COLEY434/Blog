<template>
  <div class="row">
    <div class="col-md-5 offset-md-3" style="background-color: rgb(45, 92, 86); height: 400px;margin-top: 40px; padding:5px; border-radius: 7px; overflow-y: scroll;">
            <form @submit.prevent="EditProfile">
                <p v-if="success">{{ successMessage }}</p>
                <p v-else>{{ successMessage }}</p>
                    <div class="form-group">    
                        <label for="surname" id="label-text">Surname</label>
                        <input type="text" class="form-control" v-model="ProfileData.Surname" id="surname" placeholder="FirstName">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Firstname" id="label-text">Firstname</label>
                        <input type="text" class="form-control" v-model="ProfileData.Firstname" id="Firstname" placeholder="Firstname">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Username" id="label-text">Username</label>
                        <input type="text" class="form-control" v-model="ProfileData.Username" id="Username" placeholder="Username">
                        <!-- <small>password does not match</small> -->
                    </div>
                     <div class="form-group">
                        <label for="Email" id="label-text">Email</label>
                        <input type="email" class="form-control" v-model="ProfileData.Email" id="Email" placeholder="Email">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Age" id="label-text">Age</label>
                        <input type="number" class="form-control" v-model="ProfileData.Age" id="Age" placeholder="Age">
                        <!-- <small>password does not match</small> -->
                    </div>
                     <div class="form-group">
                        <label for="gender" id="label-text">Gender</label>
                        <input type="text" class="form-control" id="gender" v-model="ProfileData.Gender" placeholder="Gender">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="State" id="label-text">State</label>
                        <input type="text" class="form-control" v-model="ProfileData.State" id="State" placeholder="State">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Country" id="label-text">Country</label>
                        <input type="text" class="form-control" v-model="ProfileData.Country" id="Country" placeholder="Country">
                        <!-- <small>password does not match</small> -->
                    </div>
                
                <button type="submit" class="btn btn-primary float-right">Edit</button>
            </form> 
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){
        this.userId = this.$store.state.userId
    },
    data(){
        return {
            ProfileData : {
                Firstname: '',
                Surname: '',
                Username: '',
                Email: '',
                Age: null,
                Gender: '',
                State: '',
                Country: ''
            },
            successMessage: null,
            success: false,
            userId: null
        }
    },


    methods : {
        EditProfile(){
            console.log(this.ProfileData);
            const userProfileData = this.ProfileData;
                  userProfileData.Age = Number(this.ProfileData.Age);
            axios.put('https://localhost:44318/api/user/edit-profile/' + this.userId, userProfileData)
                .then((response) => {
                    console.log(response.data);
                    this.successMessage = response.data.message;
                    this.success = true;
                    this.ProfileData = {};
                    this.ClearSuccessMessage();
                })
                .catch((error) => console.log(error));
        },
        ClearSuccessMessage(){
             setTimeout(() => {
                       this.successMessage = null;
                       this.success = false;
                    }, 5000);
        }
    }
}
</script>

<style scoped>
    #label-text {
        color: rgb(240, 237, 250) !important;
        
    }

    form {
        margin-top: 50px;
    }
    form button {
        background-color: rgb(15, 16, 68);
        border: none;
    }
</style>