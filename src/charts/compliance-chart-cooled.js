import { store } from "../dataStore.js";
import { colors } from "../styles/graph-variables";

console.log(store);
const complianceChartCooledData = {
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
          colors.cooled,
          colors.cooled,
          colors.cooled,
          colors.cooled,
          colors.cooled
        ],
        borderColor: [
          colors.cooledBorder,
          colors.cooledBorder,
          colors.cooledBorder,
          colors.cooledBorder,
          colors.cooledBorder
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

export default complianceChartCooledData;
