<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view />
  </div>
</template>
<script>
import Navigation from "./components/theNavigation.vue";

export default {
  components: {
    Navigation
  }
};
</script>
<style lang="scss">
@import "../src/styles/variables.scss";
@import "../src/styles/normalize.scss";

html {
  margin: 0;
  background-color: whitesmoke;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
