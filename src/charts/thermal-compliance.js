import { colors } from "../styles/graph-variables";

const thermalComplianceChart = {
  type: "bar",
  title: "Cooled",
  data: {
    labels: [],
    datasets: [
      {
        // one line graph
        label: "Not Compliant",
        data: [],
        backgroundColor: [
          colors.notCompliant,
          colors.notCompliant,
          colors.notCompliant,
          colors.notCompliant,
          colors.notCompliant
        ],
        borderColor: [
          colors.notCompliantBorder,
          colors.notCompliantBorder,
          colors.notCompliantBorder,
          colors.notCompliantBorder,
          colors.notCompliantBorder
        ],

        borderWidth: 3
      },
      {
        // another line graph
        label: "Compliant",
        data: [],
        backgroundColor: [
          colors.thermal,
          colors.thermal,
          colors.thermal,
          colors.thermal,
          colors.thermal
        ],
        borderColor: [
          colors.thermalBorder,
          colors.thermalBorder,
          colors.thermalBorder,
          colors.thermalBorder,
          colors.thermalBorder
        ],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
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

export default thermalComplianceChart;
