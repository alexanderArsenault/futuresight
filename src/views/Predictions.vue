<template>
  <div class="predictions">
    <h4>Item Compliancy predictions</h4>
    <div class="charts-container">
      <div class="compliance-chart-container">
        <h4>Standard Packaging</h4>
        <canvas class="compliance-charts" id="compliance-chart"></canvas>
      </div>
      <div class="compliance-chart-container">
        <h4>Thermal Packaging</h4>
        <canvas class="compliance-charts" id="compliance-chart-cooled"></canvas>
      </div>
    </div>
    <div class="compliance-chart-container-full">
      <h4>Risk per packing prediction</h4>
      <canvas id="risk-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import ComplianceChartData from "../charts/compliance-chart.js";
import ComplianceChartCooledData from "../charts/compliance-chart-cooled.js";
import RiskChartData from "../charts/risk-chart.js";
import moment from "moment";
import CompliancyData from "../data/compliant_items_per_order.json";
import RiskData from "../data/total_exposure_per_order.json";
import { store } from "../dataStore.js";

export default {
  data() {
    return {
      ComplianceChartData,
      ComplianceChartCooledData,
      RiskChartData,
      RiskData
    };
  },
  created() {
    var header = document.getElementsByTagName("nav")[0];
    header.scrollIntoView({ behavior: "smooth" });
  },
  mounted() {
    this.$emit("can-continue", { value: true });
    this.resetChartData();
    this.updateComplianceCharts();
    this.updateRiskcharts();
    this.createChart("compliance-chart", this.ComplianceChartData);
    this.createChart("compliance-chart-cooled", this.ComplianceChartCooledData);
    this.createChart("risk-chart", this.RiskChartData);
  },
  methods: {
    epochToDate(value) {
      return moment(value).format("MMM DD");
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
    resetChartData() {
      let chartdata = ComplianceChartData.data;
      chartdata.datasets[0].data = [];
      chartdata.datasets[1].data = [];
      chartdata.labels = [];
      let riskchartdata = RiskChartData.data;
      riskchartdata.datasets[0].data = [];
      riskchartdata.datasets[1].data = [];
      riskchartdata.labels = [];
      let chartdatacooled = ComplianceChartCooledData.data;
      chartdatacooled.labels = [];
      chartdatacooled.datasets[0].data = [];
      chartdatacooled.datasets[1].data = [];
    },

    updateComplianceCharts() {
      let chartdata = ComplianceChartData.data;

      this.StandardPackDateArray.forEach(entry => {
        chartdata.labels.push(entry.dates);
        chartdata.datasets[1].data.push(entry.compliant);
        chartdata.datasets[0].data.push(entry.not_compliant);
      });

      let chartdatacooled = ComplianceChartCooledData.data;

      this.CooledPackDateArray.forEach(entry => {
        chartdatacooled.labels.push(entry.dates);
        chartdatacooled.datasets[1].data.push(entry.compliant);
        chartdatacooled.datasets[0].data.push(entry.not_compliant);
      });
    },

    updateRiskcharts() {
      let chartdata = RiskChartData.data;
      this.StandardPackRiskArray.forEach(entry => {
        chartdata.labels.push(this.epochToDate(entry.dates));
        chartdata.datasets[0].data.push(entry.risk);
      });
      this.CooledPackRiskArray.forEach(entry => {
        chartdata.datasets[1].data.push(entry.risk);
      });
    }
  },
  computed: {
    CompliancyArray() {
      let CompliancyArray = CompliancyData.filter(
        x => x.order_number === store.order_number
      );
      store.CompliancyArray = CompliancyArray;
      return CompliancyArray;
    },
    StandardPackDateArray() {
      let StandardPackDateArray = this.CompliancyArray.filter(
        x => x.kind === "standard"
      );
      store.StandardPackDateArray = StandardPackDateArray;
      return StandardPackDateArray;
    },
    CooledPackDateArray() {
      let CooledPackDateArray = this.CompliancyArray.filter(
        x => x.kind === "thermo-o-cool"
      );
      store.CooledPackDateArray = CooledPackDateArray;
      return CooledPackDateArray;
    },

    RiskArray() {
      let RiskArray = RiskData.filter(
        x => x.order_number === store.order_number
      );
      store.RiskArray = RiskArray;
      return RiskArray;
    },
    StandardPackRiskArray() {
      let StandardPackRiskArray = this.RiskArray.filter(
        x => x.kind === "standard"
      );
      store.StandardPackRiskArray = StandardPackRiskArray;
      return StandardPackRiskArray;
    },
    CooledPackRiskArray() {
      let CooledPackRiskArray = this.RiskArray.filter(
        x => x.kind === "thermo-o-cool"
      );
      store.CooledPackRiskArray = CooledPackRiskArray;
      return CooledPackRiskArray;
    }
  }
};
</script>
<style lang="scss">
.predictions {
  padding: 40px;
}
#compliance-chart {
  box-sizing: border-box;
}
.charts-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 90px;
}
.compliance-chart-container {
  width: calc(50% - 40px);
}
.compliance-chart-container-full {
  width: 80%;
  margin: auto;
}
</style>
