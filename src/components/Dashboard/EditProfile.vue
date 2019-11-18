<template>
  <div class="row">
    <div class="col-md-5 offset-md-3" style="background-color: rgb(45, 92, 86); height: 400px;margin-top: 40px; padding:5px; border-radius: 7px; overflow-y: scroll;">
            <form>
                    <div class="form-group">
                        <!--Remember to put confirm password method in state management -->
                        <label for="surname" id="label-text">Surname</label>
                        <input type="text" class="form-control" id="surname" placeholder="FirstName">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Firstname" id="label-text">Firstname</label>
                        <input type="text" class="form-control" id="Firstname" placeholder="Firstname">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Username" id="label-text">Username</label>
                        <input type="text" class="form-control" id="Username" placeholder="Username">
                        <!-- <small>password does not match</small> -->
                    </div>
                     <div class="form-group">
                        <label for="Email" id="label-text">Email</label>
                        <input type="email" class="form-control" id="Email" placeholder="Email">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Age" id="label-text">Age</label>
                        <input type="number" class="form-control" id="Age" placeholder="Age">
                        <!-- <small>password does not match</small> -->
                    </div>
                     <div class="form-group">
                        <label for="gender" id="label-text">Gender</label>
                        <input type="text" class="form-control" id="gender" placeholder="Gender">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="State" id="label-text">State</label>
                        <input type="text" class="form-control" id="State" placeholder="State">
                        <!-- <small>password does not match</small> -->
                    </div>
                    <div class="form-group">
                        <label for="Country" id="label-text">Country</label>
                        <input type="text" class="form-control" id="Country" placeholder="Country">
                        <!-- <small>password does not match</small> -->
                    </div>
                
                <button type="submit" class="btn btn-primary float-right">Edit</button>
            </form> 
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    #label-text {
        color: rgb(240, 237, 250) !important;
        
    }

    form {
        margin-top: 50px;
    }
    form button {
        background-color: rgb(15, 16, 68);
        border: none;
    }
</style>