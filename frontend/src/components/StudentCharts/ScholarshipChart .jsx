import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ScholarshipChart = () => {

    const data = {
      labels: ['Merit-based', 'Need-based', 'Sports', 'Arts', 'Other'],
      datasets: [
        {
          data: [50, 30, 10, 5, 5],
          backgroundColor: [
            '#4CAF50',
            '#FF9800',
            '#2196F3',
            '#FF5722',
            '#9E9E9E',
          ],
        },
      ],
    };






  return <Doughnut data={data} />;
};

export default ScholarshipChart;
