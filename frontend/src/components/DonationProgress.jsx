const DonationProgress = ({ raised, goal }) => {
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">Raised: Rs. {raised.toLocaleString()}</span>
        <span className="font-medium">Goal: Rs. {goal.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-indigo-600 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-right mt-1 text-sm text-gray-600">
        {percentage}% funded
      </p>
    </div>
  );
};

export default DonationProgress;