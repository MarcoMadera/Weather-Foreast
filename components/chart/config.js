export const config = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Temp",
        fill: true,
        borderColor: "#5596f6",
        backgroundColor: "rgb(238,244,254)",
        pointRadius: 0,
        radius: 8,
        pointHoverRadius: 8,
        pointHitRadius: 60,
        pointHoverBorderWidth: 4,
        pointHoverBackgroundColor: "#5596f6",
        pointHoverBorderColor: "#fff",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    showScale: false,
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: function () {
          return null;
        },
        label: function (tooltipItems) {
          return tooltipItems.yLabel + "°C";
        },
      },
      backgroundColor: "transparent",
      titleFontColor: "#5596f6",
      bodyFontColor: "#5596f6",
      bodyFontSize: "26",
      displayColors: false,
      position: "average",
    },
  },
};
