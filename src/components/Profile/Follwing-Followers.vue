<template>
<div>
<div class="row" v-for="(user, index) in Users" :key="index" style="border: 1px solid white">
    <div class="col-md-2 col-sm-2 col-2">
        <img v-if="user.imgUrl" :src="user.imgUrl" class="img" style="width: 70px; height: 70px; border-radius: 50%" alt="">
        <img v-else src="../../assets/images/download.png" class="img" style="width: 70px; height: 70px; border-radius: 50%" alt="">
    </div> 
    <div class="col-md-10 col-sm-10 col-10" style="padding-left: 0px">
        <span class="color">Joined: {{ user.date_joined }}</span><br>
        <span class="color">Name: {{ user.surname + " " + user.firstname }}</span><br>
        <span class="color">Username: {{ user.username }}</span><br>
        
    </div>
</div>
</div>
</template>

<script>
export default {
props: {
    Users : Array
}

}
</script>

<style scoped>
.color{
    color: white
}

@media (max-width: 375px){
   .img {
       width: 50px !important;
       height: 50px !important;
       margin-top: 10px;
       margin-left: -12px;
   }
   .col-10 {
       padding-left: 12px !important;
       font-size: 14px;
   }
}
  @media (min-width: 376px) and (max-width: 580px){
      .img {
       width: 50px !important;
       height: 50px !important;
       margin-top: 10px;
       margin-left: -12px;
   }
      .col-sm-10 {
       padding-left: 12px !important;
       font-size: 14px;
       
       }
  }
</style>