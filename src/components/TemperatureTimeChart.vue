<script>
import moment from "moment";
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "risk-chart",
  extends: Line,
  mixins: [reactiveProp],
  props: {
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
        lineTension: 10,
        scaleShowGridLines: false,
        maintainAspectRatio: false,
        responsive: true,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        elements: { point: { radius: 0 } },
        scaleGridLineWidth: 0,
        scales: {
          yAxes: [
            {
              ticks: {
                padding: 10,
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: "Temperature"
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              distribuiton: "series",
              time: {
                displayFormats: {
                  hour: "MMM DD: HA"
                }
              },
              ticks: {
                beginAtZero: true,
                source: "auto"
              },
              scaleLabel: {
                display: true,
                labelString: "Elapsed Time"
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
