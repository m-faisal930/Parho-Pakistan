import { Pie } from 'react-chartjs-2';

const fundsData = {
  labels: ['Infrastructure', 'Scholarships', 'Teacher Training'],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const FundsAllocation = () => {
  return (
    <div className="stats-item bg-light p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Funds Allocation</h2>
      <Pie data={fundsData} />
    </div>
  );
};

export default FundsAllocation;