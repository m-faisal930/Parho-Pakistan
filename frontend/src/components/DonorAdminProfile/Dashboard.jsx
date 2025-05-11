import React from 'react';
import {
  FaHandHoldingUsd,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaBell,
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
      title: 'Total Donations',
      value: '$50,000',
      icon: <FaHandHoldingUsd className="text-green-500" />,
    },
    {
      title: 'Active Campaigns',
      value: '12',
      icon: <FaChartLine className="text-blue-500" />,
    },
    {
      title: 'Donors Engaged',
      value: '250',
      icon: <FaUsers className="text-yellow-500" />,
    },
    {
      title: 'Monthly Contributions',
      value: '$10,000',
      icon: <FaMoneyBillWave className="text-purple-500" />,
    },
    {
      title: 'New Notifications',
      value: '5',
      icon: <FaBell className="text-red-500" />,
    },
  ];

  const donationTrends = [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 7500 },
    { month: 'Mar', amount: 6000 },
    { month: 'Apr', amount: 9000 },
    { month: 'May', amount: 11000 },
  ];

  const engagementTrends = [
    { month: 'Jan', donors: 40 },
    { month: 'Feb', donors: 55 },
    { month: 'Mar', donors: 70 },
    { month: 'Apr', donors: 85 },
    { month: 'May', donors: 100 },
  ];

  const recentActivities = [
    { type: 'New Donation', detail: 'John Doe donated $500.' },
    { type: 'Campaign Update', detail: 'Education Fund reached 80% target.' },
    { type: 'New Donor', detail: 'Mary joined as a recurring donor.' },
  ];

  const quickActions = [
    {
      label: 'Start a Campaign',
      action: () => alert('Starting a campaign...'),
    },
    { label: 'View Reports', action: () => alert('Opening reports...') },
    {
      label: 'Send Thank You Notes',
      action: () => alert('Sending thank you notes...'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Donor Dashboard Overview</h2>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Donation Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={donationTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Donor Engagement Trends
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={engagementTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="donors" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
