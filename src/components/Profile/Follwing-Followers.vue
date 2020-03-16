<template>
<div>
<div class="row" v-for="(user, index) in Users" :key="index" style="border: 1px solid white">
    <div class="col-md-2 col-sm-2">
        <img :src="user.imgUrl" style="width: 70px; height: 70px; border-radius: 50%" alt="">
    </div> 
    <div class="col-md-9 col-sm-9" style="padding-left: 0px">
        <span style="float: right" class="color">Joined: {{ user.date_joined }}</span>
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
</style>