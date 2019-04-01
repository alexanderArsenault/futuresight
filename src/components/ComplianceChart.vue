<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "risk-chart",
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    BorderColor: {
      default: "rgba(54,73,93,.5)",
      type: String
    },
    BackgroundColor: {
      default: "rgb(54,73,93)",
      type: String
    },
    chartData: {
      type: Object,
      default: null
    }
  },
  watch: {
    chartData() {
      this.$data._chart.update();
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Compliant Items"
              },
              ticks: {
                beginAtZero: true,
                padding: 10
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Shipment Date"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
