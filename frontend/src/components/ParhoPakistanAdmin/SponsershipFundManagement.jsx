// components/ParhoPakistanAdmin/SponsershipFundManagement.jsx
export default function SponsershipFundManagement() {
  const transactions = [
    {
      id: 1,
      date: '2023-11-01',
      donor: 'Tech Corp',
      amount: '₹ 50,000',
      student: 'Ali Khan',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2023-11-05',
      donor: 'Global Aid',
      amount: '₹ 75,000',
      student: 'Sara Ahmed',
      status: 'Pending',
    },
    {
      id: 3,
      date: '2023-11-10',
      donor: 'Edu Foundation',
      amount: '₹ 1,00,000',
      student: 'Fatima Malik',
      status: 'Processing',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Fund Management</h2>
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-600 mb-2">Total Funds</p>
          <p className="text-3xl font-bold text-blue-800">₹ 2.8 Cr</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <p className="text-sm text-green-600 mb-2">This Month</p>
          <p className="text-3xl font-bold text-green-800">₹ 12.5 L</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-100">
          <p className="text-sm text-purple-600 mb-2">Pending Clearance</p>
          <p className="text-3xl font-bold text-purple-800">₹ 2.3 L</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <h3 className="text-lg font-semibold mb-4 text-green-800">
            Recent Transactions
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          transaction.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-100">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">
            Fund Allocation
          </h3>
          <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400">Pie Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
