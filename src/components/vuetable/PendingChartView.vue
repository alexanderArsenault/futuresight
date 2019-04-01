<template>
  <div class="pending-charts">
    <div id="risk-chart-container">
      <div class="risk-chart">
        <h4>Predicted Risk per Packaging per Date</h4>
        <RiskChart
          v-if="RiskDataTransformer"
          :chartData="RiskDataTransformer"
          class="chart-display-half"
        ></RiskChart>
      </div>
      <div class="risk-chart">
        <h4>Predicted Compliant Items per Packaging per Date</h4>
        <ComplianceChart
          v-if="ComplianceDataTransformer"
          :chartData="ComplianceDataTransformer"
          class="chart-display-half"
        ></ComplianceChart>
      </div>
    </div>
    <div id="icons-container">
      <font-awesome-icon
        class="icons-grid-icon"
        :icon="['fa', 'th']"
        title="View Data"
        @click="$emit('hidecharts')"
      />
    </div>
  </div>
</template>
<script>
import ComplianceChart from "../../components/ComplianceChart.vue";
import RiskChart from "../../components/RiskChart.vue";
import { colors } from "../../styles/graph-variables.js";
import RiskData from "../../data/total_exposure_per_order.json";
import ComplianceData from "../../data/number_of_compliant_items_per_order.json";
import { TableFilters } from "../../mixins/TableFiters";

export default {
  name: "pending-chart-view",
  mixins: [TableFilters],
  components: {
    ComplianceChart,
    RiskChart
  },
  props: {
    selected_option: {
      type: Object
    }
  },
  data() {
    return {
      active_order: this.selected_option.order_number
    };
  },
  computed: {
    ComplianceArray() {
      return ComplianceData.filter(x => x.order_number === this.active_order);
    },
    StandardCompliance() {
      return this.ComplianceArray.filter(x => x.kind === "standard");
    },
    ThermalCompliance() {
      return this.ComplianceArray.filter(x => x.kind === "thermo-o-cool");
    },
    GuaranteedCompliance() {
      let array = this.StandardCompliance;
      array = JSON.parse(JSON.stringify(array));
      return array.map(x => {
        x.kind = "thermo-cool-ultra";
        x.compliant = x.compliant + x.not_compliant;
        x.not_compliant = 0;
        return x;
      });
    },
    RiskArray() {
      return RiskData.filter(x => x.order_number === this.active_order);
    },
    StandardRisk() {
      return this.RiskArray.filter(x => x.kind === "standard");
    },
    ThermalRisk() {
      return this.RiskArray.filter(x => x.kind === "thermo-o-cool");
    },
    ComplianceDataTransformer() {
      let datacollection = {
        labels: [],
        datasets: [
          {
            backgroundColor: colors.standard,
            label: "Standard",
            data: []
          },
          {
            backgroundColor: colors.thermal,
            label: "Thermal",
            data: []
          },
          {
            label: "Termal Guaranteed",
            backgroundColor: colors.guaranteed,
            data: []
          }
        ]
      };
      this.StandardCompliance.forEach(x => {
        datacollection.labels.push(this.epochToName(x.dates));
        datacollection.datasets[0].data.push(x.compliant);
      });
      this.ThermalCompliance.forEach(x => {
        datacollection.datasets[1].data.push(x.compliant);
      });
      this.GuaranteedCompliance.forEach(x => {
        datacollection.datasets[2].data.push(x.compliant);
      });
      return datacollection;
    },
    RiskDataTransformer() {
      let datacollection = {
        labels: [],
        datasets: [
          {
            backgroundColor: colors.standard,
            label: "Standard",
            data: []
          },
          {
            backgroundColor: colors.thermal,
            label: "Thermal",
            data: []
          },
          {
            label: "Termal Guaranteed",
            backgroundColor: colors.guaranteed,
            data: [25, 25, 25, 25, 25]
          }
        ]
      };
      this.StandardRisk.forEach(x => {
        datacollection.labels.push(this.epochToName(x.dates));
        datacollection.datasets[0].data.push(x.risk);
      });
      this.ThermalRisk.forEach(x => {
        datacollection.datasets[1].data.push(x.risk);
      });
      return datacollection;
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

#risk-chart-container {
  width: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
}
.risk-chart {
  width: calc(50% - 20px);
  h4 {
    text-align: center;
  }
}
.chart-display-half {
  height: 275px;
}
.pending-charts {
  display: flex;
}
#icons-container {
  width: 40px;
  display: flex;
  justify-content: center;
}
.icons-grid-icon {
  cursor: pointer;
}
</style>
