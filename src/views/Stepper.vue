<template>
  <div class="wrapper">
    <horizontal-stepper
      class="stepper-parent"
      :steps="steps"
      @completed-step="completeStep"
      :keep-alive="false"
      @active-step="isStepActive"
      @stepper-finished="alert"
      @item-selected="setOrder($event)"
    >
    </horizontal-stepper>
  </div>
</template>

<script>
// @ is an alias to /src
import HorizontalStepper from "vue-stepper";
import Overview from "./Overview.vue";
import Options from "./Options.vue";
import Predictions from "./Predictions.vue";
import Confirm from "./Confirm.vue";
import router from "vue-router";

export default {
  name: "home",
  data() {
    return {
      steps: [
        {
          icon: "radio_button_checked",
          name: "overview",
          title: "Select an Order",
          component: Overview,
          completed: false
        },
        {
          icon: "play_arrow",
          name: "options",
          title: "Overview and Options",
          component: Options,
          completed: false
        },
        {
          icon: "fast_forward",
          name: "predictions",
          title: "Predictions",
          component: Predictions,
          completed: false
        },
        // {
        //   icon: "change_history",
        //   name: "details",
        //   title: "View Prediction Details",
        //   component: Details,
        //   completed: false
        // },
        {
          icon: "check",
          name: "confirm",
          title: "Confirm Shipping Profile",
          component: Confirm,
          completed: false
        }
      ]
    };
  },
  components: {
    HorizontalStepper
  },
  methods: {
    // Executed when @completed-step event is triggered
    completeStep(payload) {
      this.steps.forEach(step => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      });
    },
    // Executed when @active-step event is triggered
    isStepActive(payload) {
      this.steps.forEach(step => {
        if (step.name === payload.name) {
          if (step.completed === true) {
            step.completed = false;
          }
        }
      });
    },
    // Executed when @stepper-finished event is triggered
    alert() {
      router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  max-width: 1400px;
  width: 100%;
  padding: 0 40px;
  margin: 0 auto;
}

.stepper-parent {
  padding-top: 20px;
  margin: 40px 0;
}
</style>
