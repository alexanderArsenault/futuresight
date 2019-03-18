import { colors } from "../styles/graph-variables";

export const riskChartData = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        // one line graph
        label: "Standard Packaging Risk",
        data: [],
        backgroundColor: [
          colors.standard,
          colors.standard,
          colors.standard,
          colors.standard,
          colors.standard
        ],
        borderColor: [
          colors.standardBorder,
          colors.standardBorder,
          colors.standardBorder,
          colors.standardBorder,
          colors.standardBorder
        ],
        borderWidth: 3
      },
      {
        // another line graph
        label: "Thermal Packaging Risk",
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
      },
      {
        label: "Termal+plus Guaranteed",
        type: "line",
        backgroundColor: ["transparent"],
        borderColor: colors.insrued,
        data: [25, 25, 25, 25, 25]
      }
    ]
  },
  options: {
    responsive: true,
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

export default riskChartData;
