<template>
  <div class="container">
      <div class="row">
          <div class="col-md-4 offset-md-4">
              <div id="da">
                  <small id="emailHelp" v-if="failure" class="form-text text-danger">{{ failureMessage }}.</small>
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
            password: '',
            confirmPassword: ''
        },

        failure: false,
        failureMessage: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        emailhasError: false,
        passwordhasError: false,
        confirmPasswordhasError: false
    }
},   
methods: {

    getExpirationTime(expiresIn){
        const expIn = new Date(expiresIn);
        const currentDate = new Date();
        const expirationTimeInMiliSeconds = expIn - currentDate;
        return expirationTimeInMiliSeconds;
    },
    Register(){
        if(this.user.email === '' || null){
            this.emailError = "Please Provide your email address"
            this.emailhasError = true;
            return;
        }
        else{
            this.emailhasError = false;
        }
        
        if(this.user.password === ''){
            this.passwordError = "please type a password"
            this.passwordhasError = true;
                return;
        }
        else{
            this.passwordhasError = false;
        }
        
        // if(this.user.password.length < 6){
            
        //     this.passwordError = "password too weak"
        //     this.passwordhasError = true;
        // }
        // else{
        //     this.passwordhasError = false;
        // }
        if(this.user.password !== this.user.confirmPassword){
            this.confirmPasswordError = "Password does not match"
            this.confirmPasswordhasError = true;
                return;
        }
        else{
            this.confirmPasswordhasError = false;
        }
        
        const userDetails = {  
            email: this.user.email, 
            password: this.user.password
        }
        

if(this.user.email !== '' || this.user.password !== ''){

    axios.post('https://localhost:44318/api/authenticate/register', userDetails)
    .then((response) => {
         const result = response.data;
        if(result.success)
        {
            this.$store.dispatch('authUser', {
                token: result.token,
                userId: result.userId,
                username: result.username
            })
            const expirationTime = this.getExpirationTime(result.expiresIn);
            this.$store.dispatch('setLogoutTimer', expirationTime)

            const now = new Date();
            const expiresIn = new Date(result.expiresIn);
            const expirationDate = new Date(now.getTime() + expiresIn.getTime());

            localStorage.setItem('token', result.token);
            localStorage.setItem('expiresIn', expirationDate);
            localStorage.setItem('Id', result.userId);
            localStorage.setItem('username', result.username);
           
           this.$router.push('/posts');
        }
        if(!result.success)
        {
            this.user = {};
            this.failure = true;
            this.failureMessage = result.errorMessage;
            
        }
    })
    .catch((error) => {
        console.log(error);
    });
}


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