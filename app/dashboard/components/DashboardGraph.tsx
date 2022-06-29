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
import { useStyles } from "@styles/dashboardStyle";

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
  const { classes } = useStyles();

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
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

  const data = {
    labels,
    datasets: [
      {
        label: chartData ? chartData.series[0].name : "ROI Created",
        data: chartData
          ? chartData.series[0].data
          : [
              49.9, 71.5, 106.4, 129.2, 144, 176, 135.6, 148.5, 216.4, 194.1,
              95.6, 54.4,
            ],
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      },
    ],
  };

  return <Bar options={options} data={data} className={classes.bar} />;
};

export default DashboardGraph;
