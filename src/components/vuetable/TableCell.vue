<template>
  <div class="tablecell">
    <p id="risk-difference" :style="{ color: textColor }">
      {{ renderRiskDifference }}
    </p>
    <span>{{ pricifyTotalRisk }}</span>
  </div>
</template>
<script>
import { TableFilters } from "../../mixins/TableFiters.js";
export default {
  name: "cell",
  mixins: [TableFilters],
  props: {
    selectedRisk: {
      type: Number
    },
    shippingInstance: {
      type: Object
    }
  },
  methods: {
    colorGenerator(color1, color2, riskDifference) {
      let weight = riskDifference / 120;
      if (riskDifference > 120) {
        weight = 1;
      }
      var w1 = weight;
      var w2 = 1 - w1;
      var rgb = [
        Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)
      ];
      return `rgb(${rgb[0] + "," + rgb[1] + "," + rgb[2]})`;
    }
  },
  computed: {
    pricifyTotalRisk() {
      return this.pricify(this.shippingInstance.risk);
    },
    riskDifference() {
      return this.selectedRisk - this.shippingInstance.risk;
    },
    RiskDifferenceIsNegative() {
      if (this.selectedRisk - this.shippingInstance.risk > 0) {
        return false;
      } else if (this.selectedRisk - this.shippingInstance.risk < 0) {
        return true;
      } else {
        return null;
      }
    },
    renderRiskDifference() {
      if (this.riskDifference === 0) {
        return "––";
      }
      if (this.RiskDifferenceIsNegative) {
        return "+" + this.pricify(Math.abs(this.riskDifference));
      } else {
        return "-" + this.pricify(this.riskDifference);
      }
    },
    textColor() {
      if (this.riskDifference === 0) {
        return "#000000";
      }
      if (this.RiskDifferenceIsNegative) {
        return this.colorGenerator(
          [255, 0, 0],
          [244, 191, 66],
          Math.abs(this.riskDifference)
        );
      } else {
        return this.colorGenerator(
          [13, 168, 26],
          [136, 214, 100],
          Math.abs(this.riskDifference)
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tablecell {
  border: 1px solid whitesmoke;
  border-radius: 5px;
  display: inline-block;
  padding: 10px;
  text-align: center;
  p {
    font-size: 14px;
    margin: 0;
    font-weight: 500;
  }
  span {
    font-size: 10px;
  }
}
.negative {
  color: red;
}
.positive {
  color: green;
}
</style>
