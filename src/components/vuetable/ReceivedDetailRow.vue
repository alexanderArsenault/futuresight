<template>
  <div class="received-detail-row">
    <div class="detail-content-container">
      <div class="time-series-container">
        <h4>Shipment Temperature</h4>
        <TemperatureTimeChart
          v-if="TemperatureChartDataTransformer"
          :chartData="TemperatureChartDataTransformer"
          class="time-series-chart"
        ></TemperatureTimeChart>
      </div>
      <div class="information-section">
        <div class="items-container">
          <div class="items-list items-list-compliant">
            <h4>Compliant Items</h4>
            <div class="items-scroll-container">
              <span v-for="(item, index) in CompliantItems" :key="index">
                {{ item.name }}
              </span>
            </div>
          </div>
          <div class="items-list items-list-not-compliant">
            <h4>Not Compliant Items</h4>
            <div class="items-scroll-container">
              <span v-for="(item, index) in notCompliantItems" :key="index">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="comparison-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Predicted</th>
                <th>Actual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Compliant Items:</td>
                <td>
                  {{
                    this.SuggestedOrder.compliant +
                      " / " +
                      this.SuggestedOrder.compliant
                  }}
                </td>
                <td>7/8</td>
              </tr>
              <tr>
                <td>Value of Not Compliant Items:</td>
                <td>67.8 CHF</td>
                <td>24.2 CHF</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TableFilters } from "../../mixins/TableFiters";
import TemperatureData from "../../data/order_temperature_data.json";
import TemperatureTimeChart from "../../components/TemperatureTimeChart.vue";
// import OrderItems from "../../data/ordered_items.json";

export default {
  name: "received-detail-row",
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
    notCompliantItems() {
      return this.currentTemperatureData["non-compliant"];
    },
    CompliantItems() {
      return this.currentTemperatureData["compliant"];
    },
    SuggestedOrder() {
      return this.rowData.suggestion;
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

.received-detail-row {
  padding: 40px 20px;
}
.detail-content-container {
  display: flex;
}
.time-series-container {
  width: 50%;
  h4 {
    text-align: center;
  }
  .time-series-chart {
    height: 300px;
  }
}
.information-section {
  width: 50%;
  display: flex;
  flex-direction: row;
}
.items-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  height: auto;
  h4 {
    margin-top: 0;
    margin-bottom: 20px;
  }
}
.items-list {
  border: 1px solid whitesmoke;
  border-radius: 5px;
  padding: 20px;
  height: 50%;
  .items-scroll-container {
    flex: 1;
    min-width: 0;
    overflow-y: scroll;
    height: 75px;
    border: 1px solid whitesmoke;
  }
  span {
    font-size: 12px;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-complaint {
    span {
      color: black;
    }
  }
  &-not-compliant {
    span {
      color: red;
    }
  }
}
.comparison-container {
  border: 1px solid whitesmoke;
  border-radius: 5px;
  padding: 20px;
  width: 60%;
  table {
    border: none;
    th {
      padding: 0;
      padding-bottom: 10px;
    }
    tr {
      border: none;
      font-size: 14px;
    }
    td {
      border: none;
      padding: 5px;
    }
  }
}
</style>
