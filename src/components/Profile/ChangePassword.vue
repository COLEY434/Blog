<template>
  <div class="container">
      <div class="row">
          <div class="col-md-5 offset-md-3" style="background-color: rgb(45, 92, 86); margin-top: 40px; padding:5px; border-radius: 7px;">
            <form @submit.prevent="UpdatePassword(userId)">
                <center>
                <small v-if="error" style="color: red; background-color: white; padding: 5px; border-radius: 5px" id="errorMessage"><b>{{ errorMessage }}</b></small>
                <small v-if="success" style="color: green; background-color: white; padding: 5px; border-radius: 5px" id="errorMessage"><b>{{ successMessage }}</b></small>
                </center>
                <div class="form-group">
                    <label for="oldPassword" id="label-text">Old Password</label>
                    <input type="password" v-model="OldPassword" class="form-control" id="oldPassword" placeholder="Old Password">
                </div>
                <div class="form-group">
                    <label for="newPassword" id="label-text">New Password</label>
                    <input type="password" v-model="NewPassword" class="form-control" id="newPassword" placeholder="New Password">
                </div>
                <div class="form-group">
                    <label for="confirmPassword" id="label-text">Confirm Password</label>
                    <input type="password" v-model="ConfirmPassword" class="form-control" id="confirmPassword" placeholder="Confirm Password">
                </div>
                <button v-if="!loading" type="submit" class="btn btn-primary float-right">Update Password</button>
                 <button v-else class="btn btn-success float-right" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Updating...
                </button>
            </form> 
    </div>
      </div>
    
    </div>
</template>

<script>
import { axiosInstance } from '../../Api/axiosConfig'
export default {
created(){  
    this.userId = this.$store.state.userId
},
data(){
    return {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: '',
        errorMessage: '',
        successMessage: '',
        success: false,
        error: false,
        userId: null,
        loading: false
    }
},
methods: {
    UpdatePassword(userId){
        if(this.OldPassword === '' || this.NewPassword === '' || this.ConfirmPassword === ''){
            this.error = true
            this.errorMessage = "Please fill all the fields"
            return
        }
        if(this.NewPassword !== this.ConfirmPassword){
            this.error = true
            this.errorMessage = "Password does not match"
            return
        }
        
        const PasswordInfo = {
            OldPassword: this.OldPassword,
            NewPassword: this.NewPassword
        }
        this.loading = true
        axiosInstance.put(`/user/change-password/${Number(userId)}`, PasswordInfo)
                .then((response) => {
                    const { success } = response.data
                    if(success){
                        this.loading = false
                        this.error = false,
                        this.errorMessage = null
                        this.success = true,
                        this.successMessage = "Password Changed successfully"
                        this.ConfirmPassword = this.NewPassword = this.OldPassword = ''
                        setTimeout(() => {
                            this.success = false,
                            this.successMessage = ''
                        }, 5000)
                    }
                    if(!success){
                        this.loading = false
                        this.error = true,
                        this.errorMessage = "current password does not match old password"
                        this.ConfirmPassword = this.NewPassword = this.OldPassword = ''
                        
                    }
                })
                .catch((err) => {console.log(err)})



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