// UserJoinChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const UserJoinChart = ({ data }) => {
  console.log("doplin", data?.map(item => item.date));
  
  const chartData = {
    labels: data?.map(item => item.date), // Dates when users joined
    datasets: [
      {
        label: 'Number of Users Joined',
        data: data?.map(item => item.count), // Number of users joined on each date
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Users',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Users Joining Over Time',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UserJoinChart;
