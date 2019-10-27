<template>
  <div class="container-fluid" style="padding: 0px">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">Safari Blog</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mr-5">
          <router-link :to="{name: 'login'}" class="nav-item" tag="li"><a class="nav-link">Sign In</a></router-link> 

          <router-link :to="{name: 'register'}" class="nav-item" tag="li"><a class="nav-link">Sign up</a></router-link> 
          
          <router-link :to="{name: 'dashboard'}" class="nav-item" tag="li"><a class="nav-link">Dashboard</a></router-link> 

          <li class="nav-item">
            <span class="nav-link">Welome Username</span>
          </li>
        </ul>
      </div>

  </nav>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
  nav{
    background-color: rgb(45, 92, 86);
    color: rgb(255, 255, 255);
  }

  nav a{
    color: rgb(255, 255, 255);
  }

  .nav-item {
    margin-right: 5px;
    margin-left: 5px;
  } 

</style>