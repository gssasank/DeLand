import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  console.log(
    props.history.map((result) => {
      return result.date_owned;
    })
  );
  console.log(
    props.history.map((result) => {
      return result.bought_for;
    })
  );

  return (
    <div>
      <Line
        height={400}
        width={900}
        options={{
          layout: {
            padding: {
              top: 40,
              left: 40,
              bottom: 20,
              right: 50,
            },
          },
          maintainAspectRatio: false,
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "point",
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "rgb(79, 78, 74)",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "rgb(79, 78, 74)",
              },
            },
          },
        }}
        data={{
          labels: props.history.map((result) => {
            return result.date_owned;
          }),
          borderColor: "rgb(255,255,255)",
          datasets: [
            {
              label: props.history.map((result) => {
                return result.date_owned;
              }),
              data: props.history.map((result) => {
                return result.bought_for;
              }),
              borderColor: "rgb(185,28,28)",
              borderWidth: 3,
              pointStyle: "circle",
              pointRadius: 2,
              pointBorderWidth: 5,
            },
          ],
        }}
      />
    </div>
  );
}

export default Chart;
