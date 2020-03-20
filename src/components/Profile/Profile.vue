<template>
  <div class="container">
      <div class="col-md-7 offset-md-2" style="border: 2px solid white">
        <center>
        <h3 class="color">Profile</h3> 
         <div style="border: 2px solid white; position: relative">
            <img v-if="!userInfo.img_url" src="../../assets/images/wolve.jpg" class="img-fluid" style="border-radius: 50%" alt="">
            <img v-if="userInfo.img_url" :src="userInfo.img_url" class="img-fluid" style="border-radius: 50%; max-height: 200px" alt="">
            <span v-if="userId === Number($store.state.userId)" @click="LoadEditProfile" id="profile-edit-button">Edit-profile</span>
            <span v-if="userId !== Number($store.state.userId)" @click="Follow(userId, Number($store.state.userId))" id="follow-button">{{ isFollowing ? "Following" : "Follow"}}</span>
            
            <br>
            <span class="color">Name: {{userInfo.surname + ' ' + userInfo.firstname }} </span><br>
            <span class="color">Joined: {{ userInfo.date_joined }}</span><br>
            <span class="color">Email: {{ userInfo.email }}</span><br>
            <span class="color">Country: {{ userInfo.country }}</span><br>
             <br>
         </div>
         </center>
         <div style="border: 2px solid white; margin-left: 1px; margin-right: 1px" class="row">
           <div class="col column-style" style="border-bottom: 2px solid red" id="Posts" @click="SelectComponent('Posts')">
              Posts
            </div>
           <div class="col column-style" id="Followers" @click="SelectComponent('Followers')">
             Followers
           </div>
           <div class="col column-style" id="Following" @click="SelectComponent('Following')">
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
import { axiosInstance } from '../../Api/axiosConfig'
export default {
  components: {
     Encapsulate
  },
data(){
  return {
    SelectedComponent: 'Posts',
    userId: Number(this.$route.params.id),
    userInfo: {},
    isFollowing: false
  }
},
watch: {
  $route(newRouteData){
    this.userId = Number(newRouteData.params.id)
    this.GetUser(this.userId)
    this.GetFollowingStatus(this.userId, Number(this.$store.state.userId))
  }
},
created(){
this.GetUser(this.userId)
this.GetFollowingStatus(this.userId, Number(this.$store.state.userId))
},

methods : {
  Follow(userToFollowOrUnfollowId, userThatWantToFollowORUnfollowId){
    axiosInstance.post(`/follow/${userToFollowOrUnfollowId}/${userThatWantToFollowORUnfollowId}`)
      .then((response) => {
        const { following } = response.data
          this.isFollowing = Boolean(following)
        }
      )
      .catch((err) => console.log(err))
  },

  GetUser(PostUserId){
    axiosInstance.get('/user/' + PostUserId)
      .then((response) => {
          const data = response.data
          this.userInfo = data
          this.$store.dispatch('ProfileData', data)
      })
      .catch((err) => console.log(err))
  },

  GetFollowingStatus(PostUserId, LoggedInUserId){
    axiosInstance.get(`/follow/get-Following-status/${PostUserId}/${LoggedInUserId}`)
        .then((response) => {
           this.isFollowing = Boolean(response.data.following)
        })
          .catch((err) => console.log(err))
  },

  SelectComponent(selected){
    this.SelectedComponent = selected
    if(selected == "Posts"){
      document.getElementById("Posts").style.borderBottom = "2px solid red"
      document.getElementById("Followers").style.borderBottom = "none"
      document.getElementById("Following").style.borderBottom = "none"
    }
    if(selected == "Followers"){
      document.getElementById("Followers").style.borderBottom = "2px solid red"
      document.getElementById("Posts").style.borderBottom = "none"
      document.getElementById("Following").style.borderBottom = "none"
    }
    if(selected == "Following"){
      document.getElementById("Following").style.borderBottom = "2px solid red"
      document.getElementById("Followers").style.borderBottom = "none"
      document.getElementById("Posts").style.borderBottom = "none"
    }
   
    
  },

  LoadEditProfile(){
    this.$router.push(`/profile/${this.userId}/edit`)
  }

}
}
</script>

<style scoped>
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
#follow-button {
  position: absolute; 
  right: 5px; 
  top: 30px;
  color: white;
  cursor: pointer; 
  padding:5px 10px 5px 10px;
  border: 1px solid blue;
  border-radius: 5px;
}
#profile-edit-button {
  position: absolute;
  right: 2px;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
}
</style>