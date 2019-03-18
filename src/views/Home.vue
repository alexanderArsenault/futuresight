<template>
  <div class="home">
    <div class="upper-content">
      <div class="wrapper upper-text-container">
        <div class="upper-text-header">
          <h1>Gaining Insights with Advanced Analytics</h1>
        </div>
        <div class="upper-text-body">
          <p>
            With MODsight, Modum offers your organization solutions that provide
            deeper insight into your supply chain. Our team uses advanced
            analytical models and machine learning techniques based on trusted
            data from MODsense data loggers, your company enterprise data, and
            other relevant data sources.
          </p>
          <p>
            We help you find answers: improving supply chain operations,
            reducing related costs, and addressing customer needs with
            applications such as adaptive packaging optimization or autonomous
            identification of shipment process anomalies.
          </p>
        </div>
      </div>
    </div>
    <div class="lower-content">
      <div class="wrapper home-icon-parent">
        <shippingChoice
          v-for="(option, index) in shippingOptions"
          class="home-icon-child"
          :key="index"
          :data="option"
        ></shippingChoice>
      </div>
    </div>
    <footer>
      <div class="wrapper footer-content">
        <router-link to="about">
          <div class="button">Next Page</div>
        </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
import shippingChoice from "../components/shippingChoice";
// import { store } from "../dataStore.js";

export default {
  name: "Options",
  components: {
    shippingChoice
  },
  data() {
    return {
      shippingOptions: [
        {
          title: "Aggregated Analytics",
          class: "left-align homepage",
          img: "dashboard-1.svg",
          description:
            "MODsight harnesses leading technology to provide aggregated analytics, offering your team a basis for increasing business intelligence, process improvement, and new opportunities."
        },
        {
          title: "Better Forecasting",
          class: "left-align homepage",
          img: "globe-points.svg",
          description:
            "Better forecasting comes from using your unique enterprise data. The same data that you collect to fulfil quality requirements and meet regulatory obligations can be leveraged for predictions."
        },
        {
          title: "A global View",
          class: "left-align homepage",
          img: "helicopter.svg",
          description:
            "By aggregating your organization's data with trusted data from your industry sector, MODsight can offer unprecedented perspective."
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
}
.upper-content {
  background-color: #fff;
  flex: 1;
  display: flex;
  align-items: center;
}
.lower-content {
  padding: 60px 0;
}
h1 {
  margin: 0;
  padding: 30px;
}
footer {
  background-color: $modum;
  color: white;
  padding: 20px;
}

.footer-content {
  display: flex;
  justify-content: flex-end;
  a {
    text-decoration: none;
  }
}
.button {
  border-radius: 30px;
  padding: 10px 30px;
  background-color: $brand1;
  width: auto;
  color: white;
  text-decoration: none;
}
.upper-content {
  box-sizing: border-box;
}
.upper-text-container {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  box-sizing: border-box;
  .upper-text-body {
    width: 40%;
    box-sizing: border-box;
    padding: 40px;
  }
  .upper-text-header {
    box-sizing: border-box;
    width: 60%;
    display: flex;
    justify-content: center;
  }
  p {
    text-align: left;
    padding-bottom: 30px;
    color: #696969;
    box-sizing: border-box;
    margin: 0;
  }
}
.home-icon-parent {
  display: flex;
  justify-content: space-between;
}
.home-icon-child {
  padding: 0 40px;
}
</style>
