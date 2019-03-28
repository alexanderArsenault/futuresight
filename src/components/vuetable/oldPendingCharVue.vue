<template>
  <div>
    <div class="shipping-picker-container">
      <!-- <div class="picking-bar">
        <div
          id="standard"
          @click="packing_type = 'standard'"
          :class="[{ active: packing_type === 'standard' }, 'shipping-choice']"
        >
          Standard
        </div>
        <div
          id="thermal"
          @click="packing_type = 'thermo-o-cool'"
          :class="[
            { active: packing_type === 'thermo-o-cool' },
            'shipping-choice'
          ]"
        >
          Thermal
        </div>
        <div
          id="guaranteed"
          @click="packing_type = 'thermo-cool-ultra'"
          :class="[
            { active: packing_type === 'thermo-cool-ultra' },
            'shipping-choice'
          ]"
        >
          Thermal Guaranteed
        </div>
      </div> -->
      <!-- </div>
    <div class="detail-row-body">
      <div class="detail-row-left">
        <div id="compliance-chart-container">

        </div>
        <ItemsTable :activeOrder="active_order"></ItemsTable>
      </div>
      <div class="detail-row-right"> -->
      <div id="risk-chart-container">
        <font-awesome-icon
          :icon="['fa', 'chart-bar']"
          title="View Data"
          @click="$emit('hidecharts')"
        />
        <RiskChart
          v-if="ChartDataTransformer"
          :chartData="RiskDataTransformer"
          :height="300"
          :width="600"
        ></RiskChart>
        <ComplianceChart
          v-if="ChartDataTransformer"
          :height="250"
          :packingType="packing_type"
          :chartData="ChartDataTransformer"
        ></ComplianceChart>
      </div>
    </div>
  </div>
</template>
<script>
import ComplianceChart from "../../components/ComplianceChart.vue";
import RiskChart from "../../components/RiskChart.vue";
import { colors } from "../../styles/graph-variables.js";
import RiskData from "../../data/total_exposure_per_order.json";
import ComplianceData from "../../data/compliant_items_per_order.json";
// import ItemsTable from "../../components/vuetable/ItemsTable.vue";
import { TableFilters } from "../../mixins/TableFiters";

export default {
  name: "pending-detail-row",
  mixins: [TableFilters],
  components: {
    ComplianceChart,
    // ItemsTable,
    RiskChart
  },
  props: {
    active_order: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  data() {
    return {
      packing_type: this.rowData.suggestion,
      selected_date: "",
      currentCompliancyData: []
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
    ColorSwitcher() {
      let colorsObj = {};
      switch (this.packing_type) {
        case "standard":
          return {
            backgroundColor: colors.standard,
            borderColor: colors.standardBorder
          };
        case "thermo-o-cool":
          return {
            backgroundColor: colors.thermal,
            borderColor: colors.thermalBorder
          };
        case "thermo-cool-ultra":
          return {
            backgroundColor: colors.guaranteed,
            borderColor: colors.guaranteedBorder
          };
      }
      return colorsObj;
    },
    ChartDataTransformer() {
      let datacollection = {
        labels: [],
        datasets: [
          {
            ...this.ColorSwitcher,
            label: "Compliant",
            data: []
          },
          {
            label: "Not Compliant",
            data: []
          }
        ]
      };
      this.FilteredCompliancyData.forEach(x => {
        datacollection.labels.push(x.dates);
        datacollection.datasets[0].data.push(x.compliant);
        datacollection.datasets[1].data.push(x.not_compliant);
      });
      return datacollection;
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
            label: "Termal+plus Guaranteed",
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

.shipping-picker-container {
  display: flex;
  width: 100%;
  margin: 20px 0 30px;
  .shipping-choice {
    padding: 5px 20px;
    border: 1px solid $offWhite;
    cursor: pointer;
    margin-right: -1px;
    text-align: center;
    min-width: 200px;
    display: inline-block;
    font-size: 14px;
    text-decoration: none;
    color: $modumdark;
    &.router-link-exact-active {
      font-weight: 600;
    }
    &:first-of-type {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }
    &:last-of-type {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  }
}

.picking-bar {
  margin: 0 auto;
}

.active {
  font-weight: bold;
  color: white !important;
  box-sizing: border-box;
}
#standard.active {
  background-color: $standard;
  // border: 3px solid $standardBorder;
  border: 1px solid $standard;
}
#thermal.active {
  background-color: $thermal;
  // border: 3px solid $thermalBorder;
  border: 1px solid $thermal;
}
#guaranteed.active {
  background-color: $guaranteed;
  // border: 3px solid $guaranteedBorder;
  border: 1px solid $guaranteed;
}

.detail-row-body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.detail-row-left {
  width: 100%;
  display: flex;
  margin-bottom: 30px;
}
.detail-row-right {
  width: 100%;
}
#risk-chart-container {
  display: flex;
}
.selection-info-container {
  border: 1px solid whitesmoke;
  width: 100%;
  padding: 20px;
}
</style>
