import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceAnalysis = () => {
  const data = {
    labels: ['2021', '2022', '2023', '2024', '2025'], // Year labels
    datasets: [
      {
        label: 'Student Performance (Average Grades)',
        data: [75, 80, 85, 90, 92], // Average grades or performance percentage for each year
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Student Performance Over the Years',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Grade (%)',
        },
        min: 60,
        max: 100,
      },
    },
  };

  return (
    <div className="stats-item bg-light p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Student Performance Analysis</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default PerformanceAnalysis;
