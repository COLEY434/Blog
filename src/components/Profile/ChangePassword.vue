<template>
  <div class="row">
    <div class="col-md-5 offset-md-3" style="background-color: rgb(45, 92, 86); margin-top: 40px; padding:5px; border-radius: 7px;">
            <form>
                <div class="form-group">
                    <!--Remember to put confirm password method in state management -->
                    <label for="oldPassword" id="label-text">Old Password</label>
                    <input type="password" class="form-control" id="oldPassword" placeholder="Old Password">
                    <small>password does not match</small>
                </div>
                <div class="form-group">
                    <label for="newPassword" id="label-text">New Password</label>
                    <input type="password" class="form-control" id="newPassword" placeholder="New Password">
                    <small>password does not match</small>
                </div>
                <div class="form-group">
                    <label for="confirmPassword" id="label-text">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password">
                    <small>password does not match</small>
                </div>
                <button type="submit" class="btn btn-primary float-right">Update Password</button>
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