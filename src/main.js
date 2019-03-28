import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetable from "vuetable-2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChartBar, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChartBar, faInfoCircle);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Vuetable);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
