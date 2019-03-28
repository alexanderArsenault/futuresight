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
        responsive: false,
        height: 500,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25
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
