<template>
  <div class="container-fluid" style="padding: 0px;">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">Safari Blog</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span style="color: white" class="navbar-toggler-icon" ></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mr-5">
          <li class="nav-item" @click="collapseNavBar">
            <router-link to="/posts" v-if="auth" class="nav-link">Feed</router-link> 
          </li>
      
          <li class="nav-item" @click="collapseNavBar">
            <router-link to="/dashboard" v-if="auth" class="nav-link">Dashboard</router-link> 
          </li>
          
          <li class="nav-item" v-if="auth">
            <span v-if="username" class="nav-link"> Welcome {{username}}</span>
            <span v-else class="nav-link">Welcome Anonymous </span>
          </li>
          <li class="nav-item" @click="collapseNavBar">
            <router-link :to="profile" v-if="auth" class="nav-link">Profile</router-link> 
          </li>
          <li class="nav-item" @click="collapseNavBar">
            <router-link to="/change-password/edit" v-if="auth" class="nav-link">Change Password</router-link> 
          </li>
           <li class="nav-item">
             <span class="nav-link" v-if="auth" style="cursor: pointer" @click="Logout()">Logout</span>
           </li>
           <li class="nav-item" @click="collapseNavBar">
           <router-link v-if="!auth" to="/login" class="nav-link">Sign In</router-link> 
           </li>
            <li class="nav-item" @click="collapseNavBar">
            <router-link v-if="!auth" to="/register" class="nav-link">Sign up</router-link> 
            </li>
        </ul>
      </div>

  </nav>
</div>
</template>

<script>
import $ from 'jquery'
export default {
data(){
  return{
    username: this.$store.state.username,
    //userId: this.$store.state.userId,
    profile: `/profile/${this.$store.state.userId}`
  }
},
watch: {
    getUsername(username){
        this.username = username;
    },
    getUserId(newUserId){
        this.profile = `/profile/${newUserId}`;
    }
},
computed: {
  auth(){
    return this.$store.getters.isAuthenticated;
  },
  getUsername(){
    return this.$store.getters.getUsername;
  },
  getUserId(){
    return this.$store.state.userId
  }
},

methods: {
  Logout(){
    this.$store.dispatch('logout');
  },
  collapseNavBar(){
        $('.collapse').collapse('hide');
    },  
}
}
</script>

<style scoped>
  nav{
    background-color: #243447;
    color: rgb(255, 255, 255);
    /* rgb(45, 92, 86) */
    
    
  }
.container-fluid {
  position: fixed;
  z-index: 100;
  box-shadow: 0.3em 0.3em 1em rgba(19,27,37,0.8);
}
  nav a{
    color: rgb(255, 255, 255);
  }

  .nav-item {
    margin-right: 5px;
    margin-left: 5px;
  } 
  .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

</style>