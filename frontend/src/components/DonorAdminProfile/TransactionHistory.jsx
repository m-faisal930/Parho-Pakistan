// components/DonorAdminProfile/TransactionHistory.jsx
export default function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      date: '2023-11-01',
      amount: 15000,
      student: 'Ali Khan',
      method: 'Bank Transfer',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2023-10-15',
      amount: 20000,
      student: 'Sara Ahmed',
      method: 'Credit Card',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2023-11-25',
      amount: 18000,
      student: 'Fatima Malik',
      method: 'UPI',
      status: 'Processing',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Transaction History
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All</option>
            <option>Completed</option>
            <option>Processing</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
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
                Student
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Payment Method
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
                  ₹ {transaction.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.student}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
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
  );
}
