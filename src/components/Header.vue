<template>
  <div class="container-fluid" style="padding: 0px">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">Safari Blog</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span style="color: white" class="navbar-toggler-icon" ></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mr-5">
          <router-link :to="{name: 'login'}" class="nav-item" tag="li"><a class="nav-link">Sign In</a></router-link> 

          <router-link :to="{name: 'register'}" class="nav-item" tag="li"><a class="nav-link">Sign up</a></router-link> 
          
          <router-link :to="{name: 'posts'}" class="nav-item" tag="li"><a class="nav-link">Posts</a></router-link> 

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
  .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

</style>