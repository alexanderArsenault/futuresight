import { colors } from "../styles/graph-variables";

const guaranteedCompliance = {
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
          colors.guaranteed,
          colors.guaranteed,
          colors.guaranteed,
          colors.guaranteed,
          colors.guaranteed
        ],
        borderColor: [
          colors.guaranteedBorder,
          colors.guaranteedBorder,
          colors.guaranteedBorder,
          colors.guaranteedBorder,
          colors.guaranteedBorder
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

export default guaranteedCompliance;
