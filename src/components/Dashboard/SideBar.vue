<template>
  <div>
     <div class="side-bar">
         <ul id="side-bar-content-container" style="">
            <router-link to="/dashboard" tag="li"><a><i class="fas fa-home"></i>&nbsp;Dashboard</a></router-link>
            <router-link to="/dashboard/change-password" tag="li"><a><i class="fas fa-key"></i>&nbsp;Change Password</a></router-link>
            <router-link to="/dashboard/profile" tag="li"><a><i class="fas fa-id-card"></i>&nbsp;Profile</a></router-link>
            <li @click="show"><i class="fas fa-cogs"></i>&nbsp;Settings
                <ul id="df" style="display: none">
                    <router-link to="/dashboard/Edit-profile" tag="li"><a><i class="fas fa-edit"></i>&nbsp;Edit Profile</a></router-link>
                    <li><i class="fas fa-sign-out-alt"></i>&nbsp;LogOut</li>
                </ul>
            </li>        
         </ul>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            display: false
        }
        
    },
    methods: {
        show(){
            if(!this.display){
                document.getElementById("df").style.display = "block";
                this.display = true
            }
            else{
                document.getElementById("df").style.display = "none";
                this.display = false
            }
            
        }
    }
}
</script>

<style scoped>
.side-bar {
    background-color: rgb(45, 92, 86);
    height: 92.9vh; 
    border-top: 2px solid white !important;  
    
}

#side-bar-content-container {
    margin-top: 60px;
    padding: 0px;
}

#side-bar-content-container li {
    list-style-type: none;
    margin-top: 20px;
    padding: 10px 0px 10px 50px;
    color: white;
    cursor:pointer;

}

#side-bar-content-container li a {
    color: white;
}
#side-bar-content-container li a:hover {
    text-decoration: none;
}

#side-bar-content-container li:hover {
    background-color:rgb(39, 61, 58);

}
#df {
    padding: 0;
}

#df li:hover {
   background-color: rgb(56, 143, 138);
   
}




</style>