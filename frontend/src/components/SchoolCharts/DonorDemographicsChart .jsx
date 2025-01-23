import { Bar } from 'react-chartjs-2';

const DonorDemographicsChart = () => {
  const chartData = {
    labels: ['Individuals', 'Corporations', 'NGOs'],
    datasets: [
      {
        label: 'Donor Count',
        data: [150, 90, 50],
        backgroundColor: ['#06B6D4', '#F43F5E', '#8B5CF6'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Donor Demographics
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default DonorDemographicsChart;
