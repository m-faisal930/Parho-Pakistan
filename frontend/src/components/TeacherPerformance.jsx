import React, { useEffect, useRef } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
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
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TeacherPerformance = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cleanup chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  const data = {
    labels: [
      'Student Feedback',
      'Classroom Management',
      'Teaching Effectiveness',
    ],
    datasets: [
      {
        label: 'Teacher Performance',
        data: [90, 85, 88],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="stats-item bg-light p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Teacher Performance</h2>
      <Radar ref={chartRef} data={data} />
    </div>
  );
};

export default TeacherPerformance;
