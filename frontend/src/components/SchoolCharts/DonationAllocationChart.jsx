import { Pie } from 'react-chartjs-2';

const DonationAllocationChart = () => {
  const chartData = {
    labels: ['Infrastructure', 'Scholarships', 'Extracurricular', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Donation Allocation
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

export default DonationAllocationChart;
