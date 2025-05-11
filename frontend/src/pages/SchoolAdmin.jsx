import { useState } from 'react';
import {
  FaUsers,
  FaChartLine,
  FaHandHoldingHeart,
  FaMoneyCheckAlt,
  FaCalendarCheck,
  FaPlusCircle,
  FaBell,
  FaEnvelopeOpenText,
  FaEdit,
} from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SchoolAdmin = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Static data - Replace with API data
  const schoolData = {
    _id: '67cd4953827bb17fc8b7c9de',
    schoolName: 'ABC School',
    students: [
      {
        id: 1,
        name: 'Ali Khan',
        grade: '5th',
        sponsored: true,
        donor: 'John Doe',
        attendance: 92,
        fees: { total: 5000, paid: 5000, due: 0 },
        progress: { math: 'A', science: 'B+', english: 'A-' },
      },
      {
        id: 2,
        name: 'Sana Ahmed',
        grade: '6th',
        sponsored: false,
        attendance: 85,
        fees: { total: 5000, paid: 2000, due: 3000 },
        progress: { math: 'B', science: 'A', english: 'C+' },
      },
    ],
    sponsorships: [
      {
        id: 1,
        student: 'Ali Khan',
        donor: 'John Doe',
        startDate: '2024-01-15',
        amount: 5000,
        status: 'active',
      },
    ],
  };

  // Charts Data
  const attendanceData = {
    labels: schoolData.students.map((student) => student.name),
    datasets: [
      {
        label: 'Attendance %',
        data: schoolData.students.map((student) => student.attendance),
        backgroundColor: '#3B82F6',
        borderRadius: 5,
      },
    ],
  };

  const feeDistributionData = {
    labels: ['Paid', 'Due'],
    datasets: [
      {
        data: [
          schoolData.students.reduce(
            (sum, student) => sum + student.fees.paid,
            0
          ),
          schoolData.students.reduce(
            (sum, student) => sum + student.fees.due,
            0
          ),
        ],
        backgroundColor: ['#10B981', '#EF4444'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-xl font-bold text-gray-800">ABC School Admin</h1>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg w-64 fixed lg:relative h-screen transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 z-10`}
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">ABC School</h2>
            <p className="text-sm text-gray-600">Admin Dashboard</p>
          </div>

          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === 'students'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <FaUsers className="flex-shrink-0" />
              <span>Students</span>
            </button>

            <button
              onClick={() => setActiveTab('sponsorships')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === 'sponsorships'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <FaHandHoldingHeart className="flex-shrink-0" />
              <span>Sponsorships</span>
            </button>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === 'attendance'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <FaCalendarCheck className="flex-shrink-0" />
              <span>Attendance</span>
            </button>

            <button
              onClick={() => setActiveTab('createCase')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === 'createCase'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <FaPlusCircle className="flex-shrink-0" />
              <span>Create New Case</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">
                    Attendance Overview
                  </h3>
                  <Bar data={attendanceData} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">
                    Fee Distribution
                  </h3>
                  <Pie data={feeDistributionData} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Student List</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add Student
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">Student</th>
                        <th className="px-6 py-3 text-left">Grade</th>
                        <th className="px-6 py-3 text-left">Sponsored</th>
                        <th className="px-6 py-3 text-left">Attendance</th>
                        <th className="px-6 py-3 text-left">Fee Status</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {schoolData.students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4">{student.name}</td>
                          <td className="px-6 py-4">{student.grade}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                student.sponsored
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {student.sponsored
                                ? 'Sponsored'
                                : 'Not Sponsored'}
                            </span>
                          </td>
                          <td className="px-6 py-4">{student.attendance}%</td>
                          <td className="px-6 py-4">
                            <div className="w-24 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{
                                  width: `${
                                    (student.fees.paid / student.fees.total) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FaEdit />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <FaBell />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sponsorships Tab */}
          {activeTab === 'sponsorships' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Sponsorships</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Add Sponsorship
                </button>
              </div>

              <div className="divide-y">
                {schoolData.sponsorships.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="p-6 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div>
                      <h4 className="font-medium">{sponsor.student}</h4>
                      <p className="text-gray-600">{sponsor.donor}</p>
                      <p className="text-sm text-gray-500">
                        Amount: Rs. {sponsor.amount}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button className="bg-green-100 text-green-800 px-3 py-1 rounded-lg">
                        Send Thanks
                      </button>
                      <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
                        Remind Donor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Manage Attendance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Select Date</h4>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-4">
                    {schoolData.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span>{student.name}</span>
                        <select className="border rounded-lg px-2 py-1">
                          <option>Present</option>
                          <option>Absent</option>
                          <option>Late</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">Attendance Summary</h4>
                  <Bar data={attendanceData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          )}

          {/* Create Case Tab */}
          {activeTab === 'createCase' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">
                Create New Student Case
              </h3>
              <form className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Grade Level
                    </label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Select Grade</option>
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1}>{i + 1}th Grade</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Annual Fee
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Student Photo
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <p className="text-gray-500">
                        Drag & drop or click to upload
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Student Background
                    </label>
                    <textarea className="w-full p-2 border rounded-lg h-32"></textarea>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Publish Case
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdmin;
