import React from 'react';
import {
  FaUsers,
  FaUserGraduate,
  FaHandHoldingUsd,
  FaMoneyBillWave,
  FaCalendarCheck,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students Enrolled',
      value: '1,200',
      icon: <FaUsers className="text-blue-500" />,
    },
    {
      title: 'Total Sponsored Students',
      value: '350',
      icon: <FaUserGraduate className="text-green-500" />,
    },
    {
      title: 'Active Donors',
      value: '85',
      icon: <FaHandHoldingUsd className="text-yellow-500" />,
    },
    {
      title: 'Monthly Sponsorship Collected',
      value: '$15,000',
      icon: <FaMoneyBillWave className="text-purple-500" />,
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      icon: <FaCalendarCheck className="text-red-500" />,
    },
  ];

  const performanceData = [
    { month: 'Jan', grade: 80 },
    { month: 'Feb', grade: 85 },
    { month: 'Mar', grade: 82 },
    { month: 'Apr', grade: 88 },
    { month: 'May', grade: 90 },
  ];

  const sponsorshipData = [
    { month: 'Jan', sponsored: 50 },
    { month: 'Feb', sponsored: 65 },
    { month: 'Mar', sponsored: 80 },
    { month: 'Apr', sponsored: 90 },
    { month: 'May', sponsored: 100 },
  ];

  const recentActivities = [
    { type: 'New Sponsorship', detail: 'John Doe sponsored a student.' },
    { type: 'Fee Submission', detail: 'Mary submitted tuition for March.' },
    {
      type: 'Pending Approval',
      detail: 'Scholarship request for Ali is pending.',
    },
  ];

  const quickActions = [
    { label: 'Add Student', action: () => alert('Adding student...') },
    {
      label: 'Assign Sponsorship',
      action: () => alert('Assigning sponsorship...'),
    },
    { label: 'Generate Report', action: () => alert('Generating report...') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center"
            >
              <div className="text-4xl mr-4">{stat.icon}</div>
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Graphs & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Student Performance Trends
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="grade"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sponsorship Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sponsorshipData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="sponsored" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index} className="border-b last:border-0 py-2">
                <p className="text-gray-700 font-medium">{activity.type}</p>
                <p className="text-sm text-gray-500">{activity.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sticky Quick Actions - Responsive Design */}
      <div className="sticky bottom-0 bg-white p-3 shadow-md flex flex-wrap justify-center gap-2 sm:gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={action.action}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
