import { Line } from 'react-chartjs-2';

const DonationTrendsChart = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Donations',
        data: [5000, 8000, 6000, 10000, 7500, 9000],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Donation Trends
      </h2>
      <Line data={chartData} />
    </div>
  );
};

export default DonationTrendsChart;
