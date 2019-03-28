import Vue from "vue";
import Router from "vue-router";
import Stepper from "./views/Stepper.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Pending from "./views/Pending.vue";
import Approved from "./views/Approved.vue";
import Received from "./views/Received.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/pending",
      name: "pending",
      component: Pending
    },
    {
      path: "/approved",
      name: "approved",
      component: Approved
    },
    {
      path: "/received",
      name: "received",
      component: Received
    },
    {
      path: "/overview",
      name: "overview",
      component: Stepper
    }
  ]
});
