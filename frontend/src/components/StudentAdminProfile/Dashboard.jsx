import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const attendanceData = [
    { month: 'Jan', attendance: 95 },
    { month: 'Feb', attendance: 90 },
    { month: 'Mar', attendance: 85 },
    { month: 'Apr', attendance: 92 },
  ];

  const performanceData = [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 90 },
    { subject: 'English', score: 78 },
    { subject: 'History', score: 88 },
  ];

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {/* Attendance Summary */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-medium mb-4">Attendance Summary</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={attendanceData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Academic Insights */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-medium mb-4">Academic Insights</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={performanceData}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
        <ul className="list-disc pl-5">
          <li>Completed Math Assignment</li>
          <li>Attended Science Webinar</li>
          <li>Scored 90% in History Test</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
