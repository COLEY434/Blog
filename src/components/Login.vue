<template>
  <div class="container">
      <div class="row">
          <div class="col-md-4 offset-md-4">
              <div id="da">
              <form @submit.prevent="Login">
                  <br>
                  <center><span v-if="loginError" class="text-danger"><b>{{loginErrorMessage}}</b></span></center>
                <div class="form-group">
                    <label for="Email">Email address</label>
                    <input type="email" v-model="user.email" class="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" v-if="emailHasError" class="form-text text-danger"><b>{{emailError}}</b></small>
                </div>
 
                <div class="form-group">
                    <label for="Password">Password</label>
                    <input type="password" v-model="user.password" class="form-control" id="InputPassword" placeholder="Password">
                    <small id="emailHelp" v-if="passwordHasError" class="form-text text-danger"><b>{{passwordError}}</b></small>
                </div>
                
                <button v-if="!loading" type="submit" class="btn btn-success">Login</button>
                <button v-else class="btn btn-success" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Logging in...
                </button>
                <br><br>
               </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { axiosInstance } from '../Api/axiosConfig';
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
            loginError: false,
            loginErrorMessage: false,
            loading: false
        }
    },
    methods: {
         getExpirationTime(expiresIn){
        const expIn = new Date(expiresIn);
        const currentDate = new Date();
        const expirationTimeInMiliSeconds = expIn - currentDate;
        return expirationTimeInMiliSeconds;
    },
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

            
            if(this.user.email !== '' && this.user.password !== ''){
                this.loading = true
                axiosInstance.post('/authenticate/login', this.user)
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
                        const expiresInDateTime = new Date(result.expiresIn);
                        const expiresInMiliseconds = expiresInDateTime - now;
                        const expirationDate = new Date(now.getTime() + expiresInMiliseconds);

                        localStorage.setItem('token', result.token);
                        localStorage.setItem('expiresIn', expirationDate);
                        localStorage.setItem('Id', result.userId);
                        localStorage.setItem('username', result.username);
                    this.loading = false
                    this.$router.push('/posts');
                    }

                    if(!result.success)
                     {
                        this.loading = false
                        this.user.email = '';
                        this.user.password = ''
                        this.loginError= true;
                        this.loginErrorMessage = result.errorMessage;          
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