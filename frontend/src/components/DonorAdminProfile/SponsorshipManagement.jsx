// components/DonorAdminProfile/SponsorshipManagement.jsx
export default function SponsorshipManagement() {
  const sponsorships = [
    {
      id: 1,
      student: 'Ali Khan',
      school: 'ABC School',
      amount: 15000,
      status: 'Active',
      endDate: '2024-06-30',
    },
    {
      id: 2,
      student: 'Sara Ahmed',
      school: 'City Public School',
      amount: 20000,
      status: 'Completed',
      endDate: '2023-11-30',
    },
    {
      id: 3,
      student: 'Fatima Malik',
      school: 'Elite Academy',
      amount: 18000,
      status: 'Pending Renewal',
      endDate: '2024-01-15',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Sponsorship Management
        </h2>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all">
          New Sponsorship
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-600 mb-2">Active Sponsorships</p>
          <p className="text-3xl font-bold text-blue-800">12 Students</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <p className="text-sm text-green-600 mb-2">Total Contribution</p>
          <p className="text-3xl font-bold text-green-800">₹ 2,45,000</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-100">
          <p className="text-sm text-purple-600 mb-2">Upcoming Renewals</p>
          <p className="text-3xl font-bold text-purple-800">3 Students</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Student
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                School
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sponsorships.map((sponsor) => (
              <tr
                key={sponsor.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {sponsor.student}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sponsor.school}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹ {sponsor.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      sponsor.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : sponsor.status === 'Completed'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {sponsor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 mr-4">
                    View
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
