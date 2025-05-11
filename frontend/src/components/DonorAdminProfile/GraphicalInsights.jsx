// components/DonorAdminProfile/GraphicalInsights.jsx
export default function GraphicalInsights() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Graphical Insights
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">
            Donation Trends
          </h3>
          <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400">Line Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <h3 className="text-lg font-semibold mb-4 text-green-800">
            Donation Distribution
          </h3>
          <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400">Pie Chart Placeholder</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-100">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">
            Yearly Overview
          </h3>
          <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400">Bar Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
