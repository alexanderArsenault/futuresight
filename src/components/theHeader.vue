<template>
  <nav>
    <div class="wrapper nav-bar">
      <router-link to="/">
        <div id="nav-logo"></div>
      </router-link>
      <div class="nav-list"></div>
      <div class="nav-user"></div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "theHeader"
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.wrapper {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

nav {
  background-color: $modum;
  box-sizing: border-box;
}

#nav-logo {
  background-image: url("../assets/images/logo.svg");
  background-position: center center;
  background-repeat: no-repeat;
  padding: 40px 0;
  height: 20px;
  width: 150px;
  &:hover {
    background-color: $modumdark;
  }
}
</style>
