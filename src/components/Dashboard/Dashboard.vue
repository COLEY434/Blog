<template>
  <div class="row" style="margin-right: 0px">
    <div class="col-md-2" style="height: 92.9vh; padding: 0px;">
      <dashboard-side-bar></dashboard-side-bar>
    </div>
    <div class="col-md-10">
      <dashboard-header></dashboard-header>
    </div>
    
    
  </div>
</template>

<script>
import SideBar from './SideBar'
import DashboardHeader from './DashboardHeader'
export default {
  components: {
    dashboardSideBar: SideBar,
    dashboardHeader: DashboardHeader
  },
 
}
</script>

<style scoped>
.co {
  overflow-x: hidden;
}
</style>