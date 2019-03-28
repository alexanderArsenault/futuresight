<template>
  <div class="detail-row">
    <div class="time-series-chart">
      <TemperatureTimeChart
        v-if="TemperatureChartDataTransformer"
        :chartData="TemperatureChartDataTransformer"
        :height="500"
      ></TemperatureTimeChart>
    </div>
  </div>
</template>
<script>
import { TableFilters } from "../../mixins/TableFiters";
import TemperatureData from "../../data/order_temperature_data.json";
import TemperatureTimeChart from "../../components/TemperatureTimeChart.vue";

export default {
  name: "pending-detail-row",
  mixins: [TableFilters],
  components: {
    TemperatureTimeChart
  },
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  data() {
    return {
      active_order: this.rowData.order_number
      //   TemperatureData
    };
  },
  computed: {
    currentTemperatureData() {
      return TemperatureData[this.active_order];
    },
    TemperatureChartDataTransformer() {
      let datacollection = {
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "transparent",
            borderColor: "rgba(200,150,50,.5)",
            // pointColor: "rgba(1,1,1,1)",
            // pointStrokeColor: "rgba(1, 1, 1, 1))",
            // pointHighlightFill: "#fff",
            // pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
          }
        ]
      };
      this.currentTemperatureData.data.forEach(item => {
        let x = new Date(item.timestamp * 1000);
        let y = item.temperature;
        datacollection.datasets[0].data.push({ x, y });
      });
      return datacollection;
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

.time-series-chart {
  width: 100%;
}
</style>
