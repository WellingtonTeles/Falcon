import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { text_lg, text_rg } from "../../../assets/variable/global";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
  const { title, description, result, percent } = props;
  const data = {
    labels: ["Percentage"],
    datasets: [
      {
        label: "My First Dataset",
        data: [percent, 100 - percent],
        backgroundColor: ["#3498db", "#e0e0e0"],
        hoverBackgroundColor: ["#3498db", "#e0e0e0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", ...text_rg }}>{title}</h3>
      <p style={{ textAlign: "center", ...text_lg }}>{description}</p>
      <div style={{ width: "150px", height: "150px", position: "relative" }}>
        <Doughnut data={data} options={options} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {result}
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
