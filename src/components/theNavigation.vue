<template>
  <div class="navigation-container">
    <div class="navigation-bar">
      <router-link to="/pending"> Pending </router-link>
      <router-link to="/approved"> Approved </router-link>
      <router-link to="/received"> Data Received </router-link>
    </div>
  </div>
  <!-- <router-link></router-link> -->
</template>
<script>
export default {
  name: "navigation"
};
</script>
<style lang="scss">
@import "../styles/_variables.scss";

.navigation-container {
  display: flex;
  width: 100%;
  a {
    padding: 5px 20px;
    border: 1px solid $offWhite;
    margin-right: -1px;
    text-align: center;
    min-width: 200px;
    display: inline-block;
    font-size: 14px;
    text-decoration: none;
    color: $modumdark;
    &.router-link-exact-active {
      font-weight: 600;
    }
    &:first-of-type {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }
    &:last-of-type {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  }
}

.navigation-bar {
  margin: 0 auto;
}
</style>
