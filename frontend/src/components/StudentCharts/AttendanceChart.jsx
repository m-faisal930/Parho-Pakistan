import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const data = {
    labels: ['Attended', 'Missed'],
    datasets: [
      {
        label: 'Attendance',
        data: [85, 15],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverOffset: 4,
      },
    ],
  };



  return <Pie data={data} />;
};

export default AttendanceChart;
