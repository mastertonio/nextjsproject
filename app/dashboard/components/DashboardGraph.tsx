import React, { useContext, useEffect, useState } from "react";
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
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useQuery } from "react-query";
import UserContext from "@app/context/user.context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface iSeriesData {
  name: string;
  data: number[];
}

export interface IDashboardData {
  chart: { type: string };
  title: { text: string };
  subtitle: { text: string };
  xAxis: { categories: string[]; crosshair: boolean };
  yAxis: { min: number; title: { text: string } };
  series: iSeriesData[];
}

export interface IDashboardGraphData {
  chartData: IDashboardData;
}
const DashboardGraph: React.FC = () => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [graphData, setGraphData] = useState<IDashboardData>();
  const userCtx = useContext(UserContext)

  const getGraphData = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/data/graph`,
        {
          headers: {
            Authorization: `Bearer ${userCtx.token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "graphData",
    getGraphData
  );

  useEffect(() => {
    setGraphData(data);
  }, [data]);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: graphData?.chart.type,
      width: 900,
      height: null,
    },
    plotOptions: {
      column: {
        pointWidth: 20, //change column width -  the bars
      },
      area: {},
    },
    title: {
      text: graphData?.title.text ?? "ROIs Created Past Year",
    },
    xAxis: {
      categories: graphData?.xAxis.categories.length !== 0 ? graphData?.xAxis.categories : [
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
      title: { text: graphData?.yAxis.title.text },
    },
    series: [
      {
        type: "column",
        name: graphData?.series[0].name,
        data: graphData?.series[0].data?.length !== 0 ? graphData?.series[0].data : [
          49.9, 71.5, 106.4, 129.2, 144, 176, 135.6, 148.5, 216.4, 194.1, 95.6,
          54.4,
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default DashboardGraph;
