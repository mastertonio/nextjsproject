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
import UserContext, { UserDataProp } from "@app/context/user.context";
import { getSession } from "next-auth/react";

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


const DashboardGraph: React.FC<UserDataProp> = ({ tokens, user }) => {
  const [graphData, setGraphData] = useState<IDashboardData>();

  const getGraphData = async () => {
    if (user.role.includes("manager")) {
      return await axios.get(
        `/v1/dashboard/data/graph`, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
        params: {
          data: 1
        }
      }
      );
    }

    return await axios.get(
      `/v1/dashboard/data/graph`, {
      headers: {
        Authorization: `Bearer ${tokens.access.token}`,
      },
    }
    );

  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "graphData",
    getGraphData
  );

  useEffect(() => {
    setGraphData(data?.data);
  }, [data]);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: graphData?.chart.type,
      // width: 900,
      // height: null,
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
    responsive: {
      rules: [{
        condition: {
          maxWidth: 740
        },
        chartOptions: {
          chart: {
            className: 'small-chart'
          }
        }
      }]
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default DashboardGraph;
