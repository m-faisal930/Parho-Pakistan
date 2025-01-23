import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ExtracurricularChart = () => {
  const data = {
    labels: ['Sports', 'Music', 'Debates', 'Volunteering'],
    datasets: [
      {
        label: 'Hours Spent',
        data: [20, 15, 10, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return <Bar data={data} />;
};

export default ExtracurricularChart;
