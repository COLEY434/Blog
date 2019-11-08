<template>
  <div>
      <button class="btn btn-info" @click="goBack">Go Back</button><br>
      you are welcome
  </div>
</template>

<script>
export default {
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>