<template>
  <div class="container">
      <div class="row">
          <div class="col-md-4 offset-md-4">
              <div id="da">
              <form @submit.prevent="Register">
                  <br>
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" v-model="user.email"  class="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" v-if="emailhasError" class="form-text text-info">{{emailError}}.</small>
                    
                </div>

                <div class="form-group">
                    <label for="Password">Password</label>
                    <input type="password" v-model="user.password" class="form-control" id="InputPassword" placeholder="Password">
                    <small id="emailHelp" v-if="passwordhasError" class="form-text text-info">{{passwordError}}.</small>
                </div>
                
                 <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" v-model="user.confirmPassword" class="form-control" id="confirmPassword" placeholder="Confirm Password">
                    <small id="emailHelp" v-if="confirmPasswordhasError" class="form-text text-info">{{confirmPasswordError}}.</small>
                </div>
                    
                <button type="submit" class="btn btn-success">Register</button>
                <br><br>

               </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    
    data(){
        return {
            user: {
                email: '',
                password: null,
                confirmPassword: null
            },
            emailError: null,
            passwordError: null,
            confirmPasswordError: null,
            emailhasError: false,
            passwordhasError: false,
            confirmPasswordhasError: false

        }
    },
    methods: {
        Register(){
            
            if(this.user.email === '' || null){
                this.emailError = "Invalid email address"
                this.emailhasError = true;
            }
            else{
                this.emailhasError = false;
            }

            if(this.user.password === null || ''){
                this.passwordError = "please type a pasword"
                this.passwordhasError = true;
            }
            else{
                this.passwordhasError = false;
            }

            if(this.user.password.length < 6){
               
                this.passwordError = "password too weak"
                this.passwordhasError = true;
            }
            else{
                this.passwordhasError = false;
            }



            if(this.user.password !== this.user.confirmPassword){
                this.confirmPasswordError = "Password does not match"
                this.confirmPasswordhasError = true;
            }
            else{
                this.confirmPasswordhasError = false;
            }

            

            const userDetails = {
                surname: 'Okafor',
                firstname: 'frank',
                gender: 'male',
                 state: 'Lagos state',
                age: 44,   
                email: this.user.email,
                password: this.user.password
            }
            console.log(userDetails);
            axios.post('https://localhost:44318/api/user/create', userDetails)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        
    }
}
</script>

<style scoped>
    .col-md-4 {
        margin-top: 120px;
        background-color:rgb(45, 92, 86);;
        border-radius: 5px;
    }
    #da {
        padding: 10px;
    }
    label {
        color: white;
    }
</style>