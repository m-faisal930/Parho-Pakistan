import React, { useState, useEffect } from 'react';
import {
  FaCheck,
  FaTimes,
  FaHistory,
  FaCalendarAlt,
  FaUser,
  FaSearch,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'react-router-dom';

const AttendanceManagement = ({school_id}) => {
  
  // const {school_Id} = useParams(); // Assuming you're using react-router-dom to get the schoolId from the URL
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState('take'); // 'take' or 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId] = useState(school_id); // Replace with actual school ID
console.log(schoolId)

  useEffect(() => {
    console.log('Current viewMode:', viewMode);
  }, [viewMode]);
  // Fetch students and attendance data
  useEffect(() => {
  
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch sponsored students
        const studentsRes = await fetch(
          `http://localhost:3000/attendance/students?schoolId=${schoolId}`
        );
        const studentsData = await studentsRes.json();

        if (!studentsRes.ok) throw new Error(studentsData.message);

        // Fetch today's attendance records
        const attendanceRes = await fetch(
          `http://localhost:3000/attendance?schoolId=${schoolId}&date=${selectedDate}`
        );
        const attendanceData = await attendanceRes.json();

        if (!attendanceRes.ok) throw new Error(attendanceData.message);
        // console.log("first",attendanceData.data);
        // console.log("second", studentsData.data);

        setStudents(studentsData.data);
        setAttendanceRecords(attendanceData.data);
        console.log(students)
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, schoolId]);



  // Handle attendance status change
  const handleStatusChange = async (studentId, status) => {
    try {
      const response = await fetch('http://localhost:3000/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolId,
          studentId,
          date: selectedDate,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      // Update local state
      const existingIndex = attendanceRecords.findIndex(
        (record) => record.student._id === studentId
      );

      if (existingIndex >= 0) {
        const updatedRecords = [...attendanceRecords];
        updatedRecords[existingIndex] = data.data;
        setAttendanceRecords(updatedRecords);
      } else {
        setAttendanceRecords([...attendanceRecords, data.data]);
      }

      toast.success(`Attendance marked as ${status}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Filter students based on search
  const filteredStudents = students.filter((student) =>
  
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(filteredStudents);

  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                console.log("Setting viewMode to 'take'");
                
                setViewMode('take')}}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'take' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Take Attendance
            </button>
            <button
              onClick={() => setViewMode('view')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              <FaHistory className="inline mr-2" />
              View Records
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Attendance Taking View */}
        {viewMode === 'take' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (

                    filteredStudents.map((student) => {
                      const attendanceRecord = attendanceRecords.find(
                        (record) => record.student._id === student._id
                      );
                      const status = attendanceRecord?.status || '';

                      return (
                        <tr key={student._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {student.profilePicture ? (
                                  <img
                                    src={student.profilePicture}
                                    alt={student.fullName}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <FaUser className="text-gray-400" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {student.fullName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.currentGrade}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() =>
                                  handleStatusChange(student._id, 'present')
                                }
                                className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                                  status === 'present'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                <FaCheck /> Present
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(student._id, 'absent')
                                }
                                className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                                  status === 'absent'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                <FaTimes /> Absent
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(student._id, 'late')
                                }
                                className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                                  status === 'late'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                Late
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No sponsored students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Records View */}
        {viewMode === 'view' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.length > 0 ? (
                    attendanceRecords.map((record) => (
                      <tr key={record._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                              {record.student.profilePicture ? (
                                <img
                                  src={record.student.profilePicture}
                                  alt={record.student.fullName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <FaUser className="text-gray-400" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {record.student.fullName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {record.student.currentGrade}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-center">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                record.status === 'present'
                                  ? 'bg-green-100 text-green-800'
                                  : record.status === 'absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {record.status.charAt(0).toUpperCase() +
                                record.status.slice(1)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No attendance records found for selected date
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
