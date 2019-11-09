<template>
  <div>
     <div class="side-bar">
         <ul id="side-bar-content-container" style="">
            <li><i class="fas fa-home"></i>&nbsp; Dashboard</li>
            <li><i class="fas fa-key"></i>&nbsp;Change Password</li>
            <li><i class="fas fa-id-card"></i>&nbsp;Profile</li>
            <li @click="show"><i class="fas fa-cogs"></i>&nbsp;Settings
                <ul id="df" style="display: none">
                    <li><i class="fas fa-edit"></i>&nbsp;Edit Profile</li>
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
    color: white;
    padding: 10px 0px 10px 50px;
    cursor: pointer;

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