import { Bar } from 'react-chartjs-2';

const MonthlyDonationComparisonChart = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Individuals',
        data: [4000, 5000, 3000, 6000, 4000, 5000],
        backgroundColor: '#34D399',
      },
      {
        label: 'Corporations',
        data: [2000, 3000, 2500, 4000, 3000, 3500],
        backgroundColor: '#3B82F6',
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Monthly Donation Comparison
      </h2>
      <Bar
        data={chartData}
        options={{ plugins: { legend: { position: 'top' } } }}
      />
    </div>
  );
};

export default MonthlyDonationComparisonChart;
