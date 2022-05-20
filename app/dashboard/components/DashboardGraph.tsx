import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'ROIs Created Past Year',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'ROI Created',
      data: [400, 450, 550, 450, 650, 600, 730, 300],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const DashboardGraph: React.FC = () => {
  return <Bar options={options} data={data} />;
}

export default DashboardGraph
