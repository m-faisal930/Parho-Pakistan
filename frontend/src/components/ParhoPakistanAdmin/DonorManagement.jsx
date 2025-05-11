// components/ParhoPakistanAdmin/DonorManagement.jsx
export default function DonorManagement() {
  const donors = [
    {
      id: 1,
      name: 'Tech Corp',
      total: '₹ 2,45,000',
      students: 15,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Edu Foundation',
      total: '₹ 1,80,000',
      students: 10,
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Global Aid',
      total: '₹ 3,20,000',
      students: 22,
      status: 'Active',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Donor Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search donors..."
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all">
            + Add Donor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-600 mb-2">Total Donors</p>
          <p className="text-3xl font-bold text-blue-800">184</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <p className="text-sm text-green-600 mb-2">Active Donors</p>
          <p className="text-3xl font-bold text-green-800">132</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-100">
          <p className="text-sm text-purple-600 mb-2">Total Contributions</p>
          <p className="text-3xl font-bold text-purple-800">₹ 5.2 Cr</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <h3 className="text-lg font-semibold mb-4 text-green-800">
            Donation Trends
          </h3>
          <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400">Bar Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-100">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">
            Top Donors
          </h3>
          <div className="space-y-4">
            {donors.map((donor) => (
              <div key={donor.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{donor.name}</p>
                    <p className="text-sm text-gray-500">
                      {donor.total} • {donor.students} students
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      donor.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {donor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



