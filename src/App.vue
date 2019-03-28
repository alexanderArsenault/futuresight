<template>
  <div id="app">
    <Header></Header>
    <div id="app-body">
      <div class="content-body">
        <navigation></navigation>
        <div class="content-view">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./components/theHeader.vue";
import Navigation from "./components/theNavigation.vue";

export default {
  name: "Base",
  components: {
    Header,
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
#app-body {
  background-color: whitesmoke;
  padding: 30px;
}

.content-body {
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  padding: 30px;
  margin: 0 auto;
  max-width: 1400px;
}
.content-view {
  margin-top: 30px;
}
</style>
