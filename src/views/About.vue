<template>
  <div class="about">
    <div class="wrapper parent-content">
      <div class="about-text-container">
        <div>
          <h1>Temperature Prediction</h1>
          <p>
            Temperature projections allow you to optimize your delivery schedule
            to lower risk and costs.
          </p>
        </div>
        <div>
          <h1>Cost per shipment Risk Analysis</h1>
          <p>
            Leverage big data to minimize your shipping costs. Leverage big data
            to minimize your shipping costs.
          </p>
        </div>
        <div>
          <h1>Integrate with your ERP system</h1>
          <p>
            Integrate seamlessly with your ERP system and automate optomized
            shipping processes
          </p>
        </div>
      </div>
      <div>
        <h2>Generic Packaging Options</h2>
        <div class="shipping-parent">
          <shippingChoice
            v-for="(option, index) in shippingOptions"
            :key="index"
            :data="option"
          ></shippingChoice>
        </div>
      </div>
    </div>
    <footer>
      <div class="wrapper footer-content">
        <router-link to="overview">
          <div class="button">Dashboard</div>
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import shippingChoice from "../components/shippingChoice";
export default {
  components: {
    shippingChoice
  },
  data() {
    return {
      shippingOptions: [
        {
          title: "Standard Packaging",
          img: "standard.jpg",
          cost: "0.10 R",
          thermal: "10mHz",
          description:
            "This option provides the least temperature resistance and is ideal for short trips or non temperature sensitive product"
        },
        {
          title: "Thermal Packaging",
          img: "thermal.jpg",
          cost: "4 fr",
          thermal: "0.5mHz",
          description:
            "This is the typical transport option for temperature sensitive products. Provides some reslience against the weather, but has no assurance that the product will stay within the band"
        },
        {
          title: "Thermal+plus Guarantee",
          img: "thermalplus.jpg",
          cost: "25 fr",
          thermal: " - ",
          description:
            "The most expensive option, includes a provider guarantee that the product will stay within the temperature band."
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.about {
  background-color: #fff;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}
.about-text-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 50px;
  justify-content: space-between;
  > div {
    width: calc(33% - 40px);
  }
}
.parent-content {
  flex: 1;
  padding: 40px 0;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}
h2 {
  margin: 0;
  padding: 20px;
}
.shipping-parent {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
