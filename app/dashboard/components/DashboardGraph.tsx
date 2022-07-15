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
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

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
  const chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      width: 900,
      height: null,
    },
    plotOptions: {
      column: {
        pointWidth: 20 //change column width -  the bars
      },
      area: {

      }
    },
    title: {
      text: chartData ? chartData.title.text : "ROIs Created Past Year",
    },
    xAxis: {
      categories: chartData
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
          ],
    },
    yAxis: {
      title: { text: "" },
    },
    series: [
      {
        type: "column",
        name: "ROIs Created",
        data: chartData
          ? chartData.series[0].data
          : [
              49.9, 71.5, 106.4, 129.2, 144, 176, 135.6, 148.5, 216.4, 194.1,
              95.6, 54.4,
            ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default DashboardGraph;
