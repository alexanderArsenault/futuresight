import { colors } from "../styles/graph-variables";

const complianceChartData = {
  type: "bar",
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
        ],
        borderColor: [
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

export default complianceChartData;
