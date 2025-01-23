import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AcademicPerformanceChart = () => {


  const data = {
    labels: ['5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'],
    datasets: [
      {
        label: 'Mathematics',
        data: [78, 82, 85, 80, 88, 90, 92, 95],
        borderColor: '#4CAF50',
        fill: false,
      },
      {
        label: 'Science',
        data: [75, 80, 78, 85, 87, 90, 93, 96],
        borderColor: '#2196F3',
        fill: false,
      },
      {
        label: 'English',
        data: [80, 83, 86, 89, 91, 94, 95, 97],
        borderColor: '#FFC107',
        fill: false,
      },
    ],
  };


  return <Line data={data} />;
};

export default AcademicPerformanceChart;
