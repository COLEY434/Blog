<template>
<div>
  <div class="row" style="margin-right: 0px">
      <div class="col-md-3">
        <div class="box-header" style="background-color: rgb(217, 28, 224);">
          <h3 class="box-header-content">Post</h3> 
          <h3 class="box-header-content">23</h3> 
        </div>
      </div>
      <div class="col-md-3">
        <div class="box-header" style="background-color: rgb(40, 93, 207);">
          <h3 class="box-header-content">Followers</h3>  
          <h3 class="box-header-content">90</h3>  
        </div>
      </div>
      <div class="col-md-3">
        <div class="box-header" style="background-color: rgb(56, 221, 139);">
          <h3 class="box-header-content">Likes</h3>
          <h3 class="box-header-content">54</h3>
        </div>
      </div>
      <div class="col-md-3">
        <div class="box-header" style="background-color: rgb(241, 76, 54);">
          <h3 class="box-header-content">Replies</h3>
          <h3 class="box-header-content">9</h3>
        </div>
      </div>
  </div>
  <br>
  <hr style="height: 2px; background-color: rgb(10, 42, 71);">

  
    <router-view></router-view>   
  
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .box-header {
    position: relative;
    width: 100%;
    height: 200px;
    margin: 2px;
    border-radius: 7px;
    
  }

  .box-header-content {
    color: white;
    text-align: center;
    padding-top: 60px;
    
  }
</style>