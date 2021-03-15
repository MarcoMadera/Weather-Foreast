import Chart from "chart.js";
import { useEffect, useRef, useState } from "react";

export default function WeatherChart({ data, labels }) {
  const canvasRef = useRef();
  const [chartInstance, setChartInstance] = useState(null);
  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temp",
          data: data,
          fill: true,
          borderColor: "#5596f6",
          backgroundColor: "rgb(238,244,254)",
          pointRadius: [8],
          pointBorderWidth: 4,
          pointBackgroundColor: "#5596f6",
          pointBorderColor: "#fff",
        },
      ],
    },
    options: {
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
      maintainAspectRatio: false,
    },
  };
  const updateData = (datasetIndex, newData, newLabels) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.data.labels = newLabels;
    chartInstance.update();
  };
  useEffect(() => {
    if (chartInstance) {
      updateData(0, data, labels);
    }
  }, [chartInstance, data, labels]);
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const newChartInstance = new Chart(canvasRef.current, config);
      setChartInstance(newChartInstance);
    }
  }, [canvasRef]);

  return (
    <div>
      <p>Temperature</p>
      <section>
        <canvas ref={canvasRef}></canvas>
      </section>
      <style jsx>{`
        div {
          grid-area: chart;
          width: 100%;
          height: 100%;
        }
        p {
          font-size: 18px;
          margin: 20px 0 0 0;
        }
        section {
          display: block;
          height: 140px;
        }
      `}</style>
    </div>
  );
}
