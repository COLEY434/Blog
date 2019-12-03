<template>
  <div class="container">
      <div class="row">
          <div class="col-md-4 offset-md-4">
              <div id="da">
              <form @submit.prevent="Login">
                  <br>
                  <center><span v-if="loginError" class="text-danger">Invalid email or password</span></center>
                <div class="form-group">
                    <label for="Email">Email address</label>
                    <input type="email" v-model="user.email" class="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" v-if="emailHasError" class="form-text text-danger">{{emailError}}</small>
                </div>
 
                <div class="form-group">
                    <label for="Password">Password</label>
                    <input type="password" v-model="user.password" class="form-control" id="InputPassword" placeholder="Password">
                    <small id="emailHelp" v-if="passwordHasError" class="form-text text-danger">{{passwordError}}</small>
                </div>
                
                <button type="submit" class="btn btn-success">Login</button>
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
                password: ''
            },
            emailError: null,
            emailHasError: false,
            passwordError: null,
            passwordHasError: false,
            loginError: false
        }
    },
    methods: {
        Login(){
            if(this.user.email == ''){
                this.emailError = "please type your email address";
                this.emailHasError = true;
            }
            else{
                this.emailHasError = false;
            }

            if(this.user.password == ''){
                this.passwordError = "please type your password";
                this.passwordHasError = true;
            }
            else{
                this.passwordHasError = false;
            }

            console.log(this.user);
            if(this.user.email !== '' && this.user.password !== ''){

                axios.post('https://localhost:44318/api/user/login', this.user)
                .then((response) => {
                    const userId = response.data.userId;
                    const success = response.data.success;
                    if(success){
                        localStorage.setItem('userId', userId);
                        this.$store.dispatch('setId', userId);
                        this.$router.push('/posts');
                    }
                    else{
                        this.loginError = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            
        }
    }
}
</script>

<style>
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