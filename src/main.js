import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetable from "vuetable-2";

Vue.config.productionTip = false;
Vue.use(Vuetable);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
