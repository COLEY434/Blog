<template>
  <div class="container">
      <div class="col-md-7 offset-md-2" style="border: 2px solid white">
        <center>
        <h3 class="color">Profile</h3> 
         <div style="border: 2px solid white; position: relative">
            <img src="../../assets/images/wolve.jpg" style="border-radius: 50%" alt="">
            <span style="position: absolute; right: 0px" class="color">Edit</span>
            <span style="position: absolute; right: 5px; top: 30px;color: white; cursor: pointer; padding:5px 10px 5px 10px; border: 1px solid blue; border-radius: 5px">Follow</span>
            
            <br>
            <span class="color">Name: {{userInfo.surname + ' ' + userInfo.firstname }} </span><br>
            <span class="color">Joined: {{ userInfo.date_joined }}</span><br>
            <span class="color">Email: {{ userInfo.email }}</span><br>
             <br>
         </div>
         </center>
         <div style="border: 2px solid white; margin-left: 1px; margin-right: 1px" class="row">
           <div class="col column-style" @click="SelectedComponent = 'Posts'">
              Posts
            </div>
           <div class="col column-style" @click="SelectedComponent = 'Followers'">
             Followers
           </div>
           <div class="col column-style" @click="SelectedComponent = 'Following'">
             Following
            
           </div>
         </div>
         
      <br>
      <Encapsulate :selected="SelectedComponent" :userId="userId"></Encapsulate>
      
      
      </div>
   </div>
</template>

<script>
import Encapsulate from './Encapsulate'
import axios from 'axios'
export default {
  components: {
     Encapsulate
  },
data(){
  return {
    SelectedComponent: 'Posts',
    userId: Number(this.$route.params.id),
    userInfo: {}
  }
},
mounted(){
  axios.get('https://blogapi.azurewebsites.net/api/user/' + this.userId)
        .then((response) => {
          //console.log(response.data)
            const data = response.data
            this.userInfo = data
        })
          .catch((err) => console.log(err))
}
}
</script>

<style>
.color {
  color: white
}
.column-style {
  cursor: pointer;
  text-align: center;
  color: white;
  padding-top: 7px;
  padding-bottom: 7px
}
</style>