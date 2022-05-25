import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface iSeriesData {
  name: string;
  data: number[];
}

interface IDashboardData {
  chart: { type: string };
  title: { text: string };
  subtitle: { text: string };
  xAxis: { categories: string[]; crosshair: boolean };
  yAxis: { min: number; title: { text: string } };
  series: iSeriesData[];
}

interface IDashboardGraphData {
  chartData: IDashboardData;
}
const DashboardGraph: React.FC<IDashboardGraphData> = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartData ? chartData.title.text : "ROIs Created Past Year",
      },
    },
  };

  const labels = chartData
    ? chartData.xAxis.categories
    : ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: chartData ? chartData.series[0].name : "ROI Created",
        data: chartData
          ? chartData.series[0].data
          : [400, 450, 550, 450, 650, 600, 730, 300],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default DashboardGraph;
