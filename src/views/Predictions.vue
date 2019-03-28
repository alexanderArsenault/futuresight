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
import ComplianceChartData from "../charts/thermal-compliance.js";
import ComplianceChartCooledData from "../charts/standard-compliance.js";
import RiskChartData from "../charts/risk-chart.js";
import moment from "moment";
import RiskData from "../data/total_exposure_per_order.json";

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
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
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
