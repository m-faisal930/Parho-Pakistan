const Sponsorship = () => {
  const sponsorships = [
    { donor: 'ABC Foundation', amount: '$2000', status: 'Approved' },
    { donor: 'XYZ Charity', amount: '$1500', status: 'Pending' },
    { donor: 'Global Aid', amount: '$1000', status: 'Approved' },
  ];

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-2xl font-semibold">Sponsorships</h2>

      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-medium">Received Sponsorships</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Donor</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sponsorships.map((s, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{s.donor}</td>
                <td className="border border-gray-300 p-2">{s.amount}</td>
                <td
                  className={`border border-gray-300 p-2 ${
                    s.status === 'Approved'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {s.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sponsorship;
