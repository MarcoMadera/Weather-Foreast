import Chart from "chart.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "./config";

export default function WeatherChart({ data, labels }) {
  const canvasRef = useRef();
  const [chartInstance, setChartInstance] = useState(null);
  const updateData = useCallback(
    (datasetIndex, newData, newLabels) => {
      chartInstance.data.datasets[datasetIndex].data = newData;
      chartInstance.data.labels = newLabels;
      chartInstance.update();
    },
    [chartInstance]
  );

  useEffect(() => {
    if (chartInstance) {
      updateData(0, data, labels);
    }
  }, [chartInstance, data, labels, updateData]);
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const newChartInstance = new Chart(
        canvasRef.current.getContext("2d"),
        config
      );
      setChartInstance(newChartInstance);
    }
  }, []);

  return (
    <section>
      <p>Temperature</p>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
      <style jsx>{`
        section {
          grid-area: chart;
          height: 100%;
        }
        p {
          font-size: 18px;
          margin: 20px 0 0 0;
          color: rgb(102, 102, 102);
        }
        div {
          display: block;
          height: 150px;
          position: relative;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
