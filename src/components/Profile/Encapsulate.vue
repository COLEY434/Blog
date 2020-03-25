<template>
  <div class="col">
      <component :userId="user_Id" :is="SelectedComponent"></component>
  </div>
</template>

<script>
import MyPosts from './MyPosts'
import MyFollowers from './MyFollowers'
import Following from './Following'
export default {
components: {
    Posts: MyPosts,
    Followers: MyFollowers,
    Following: Following
  },
  watch: {
      selected(newSelected){
          this.SelectedComponent = newSelected
      },
      userId(newId){
          this.user_Id = newId
      }
  },
  props : {
      userId: Number,
      selected: String
  },
  data(){
      return {
          SelectedComponent: this.selected,
          user_Id: this.userId
      }
  },
//   mounted(){
       
//       this.SelectedComponent = this.selected
//       this.user_Id = this.userId
//   }
}
</script>

<style>

</style>