// components/ParhoPakistanAdmin/ComplaintsFraud.jsx
export default function ComplaintsFraud() {
  const complaints = [
    { id: 1, date: '2023-11-01', category: 'Fraud', status: 'Open', priority: 'High' },
    { id: 2, date: '2023-11-05', category: 'Complaint', status: 'In Progress', priority: 'Medium' },
    { id: 3, date: '2023-11-10', category: 'Feedback', status: 'Resolved', priority: 'Low' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Complaints & Fraud Management</h2>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all">
          + New Case
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-100">
          <p className="text-sm text-red-600 mb-2">Open Cases</p>
          <p className="text-3xl font-bold text-red-800">15</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-100">
          <p className="text-sm text-yellow-600 mb-2">In Progress</p>
          <p className="text-3xl font-bold text-yellow-800">8</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <p className="text-sm text-green-600 mb-2">Resolved</p>
          <p className="text-3xl font-bold text-green-800">42</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Priority</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">{complaint.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{complaint.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                    complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {complaint.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    complaint.status === 'Open' ? 'bg-red-100 text-red-800' :
                    complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 mr-4">View</button>
                  <button className="text-gray-500 hover:text-gray-700">Assign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}