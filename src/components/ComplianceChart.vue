<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "compliance-chart",
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
      type: Object
    }
  },
  watch: {
    chartData() {
      this.$data._chart.update();
    }
  },
  data() {
    return {
      chartdata1: {
        labels: ["may1", "may2", "may3", "may4", "may4"],
        datasets: [
          {
            label: "Compliant",
            backgroundColor: "#000000",
            data: [8, 8, 8, 8, 8]
          },
          {
            label: "Not Compliant",
            data: [8, 8, 8, 8, 8]
          }
        ]
      },
      options: {
        responsive: false,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                padding: 25
              }
            }
          ],
          xAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartdata1, this.options);
  }
};
</script>
