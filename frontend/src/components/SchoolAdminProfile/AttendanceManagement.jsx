import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // For notifications

const AttendanceManagement = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample Students Data
  const dummyStudents = [
    { id: 1, name: 'John Doe', class: '10A' },
    { id: 2, name: 'Jane Smith', class: '10A' },
    { id: 3, name: 'Alex Johnson', class: '10B' },
  ];

  // Simulated attendance data for the entire year (for demo purposes)
  const dummyAttendanceData = {
    1: {
      '01/01/2025': 'Present',
      '02/01/2025': 'Absent',
      '03/01/2025': 'Present',
      // More data...
    },
    2: {
      '01/01/2025': 'Absent',
      '02/01/2025': 'Present',
      '03/01/2025': 'Present',
      // More data...
    },
    // More students...
  };

  // Initialize students and default date
  useEffect(() => {
    setStudents(dummyStudents);
    setAttendanceData(dummyAttendanceData);
    setSelectedDate(new Date().toLocaleDateString()); // Default to today's date
  }, []);

  // Calculate total presents, absents, and attendance percentage for each student
  const calculateAttendanceStats = (studentId) => {
    const attendance = attendanceData[studentId] || {};
    const totalDays = Object.keys(attendance).length;
    const presentCount = Object.values(attendance).filter(
      (status) => status === 'Present'
    ).length;
    const absentCount = totalDays - presentCount;

    const attendancePercentage =
      totalDays === 0 ? 0 : (presentCount / totalDays) * 100;

    return { presentCount, absentCount, attendancePercentage };
  };

  // Handle changing attendance status for each student
  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: {
        ...prevData[studentId],
        [selectedDate]: isPresent ? 'Present' : 'Absent',
      },
    }));
  };

  // Save attendance function
  const handleSaveAttendance = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Attendance saved successfully!');
      setIsTakingAttendance(false); // Exit the "Taking Attendance" mode
    }, 1500);
  };

  return (
    <div className="attendance-management">
      <h2 className="text-center font-bold text-2xl mb-6">
        Attendance Management
      </h2>



      {/* Display Attendance History or Take Attendance */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">
          {isTakingAttendance
            ? "Mark Today's Attendance"
            : 'Attendance History'}
        </h3>

        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Attendance Status</th>
              {!isTakingAttendance && (
                <>
                  <th className="border p-2">Total Presents</th>
                  <th className="border p-2">Total Absents</th>
                  <th className="border p-2">Attendance Percentage</th>
                </>
              )}
              {isTakingAttendance && <th className="border p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const { presentCount, absentCount, attendancePercentage } =
                calculateAttendanceStats(student.id);

              return (
                <tr key={student.id}>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">
                    {attendanceData[student.id]?.[selectedDate] || 'Not marked'}
                  </td>
                  {!isTakingAttendance && (
                    <>
                      <td className="border p-2">{presentCount}</td>
                      <td className="border p-2">{absentCount}</td>
                      <td className="border p-2">
                        {attendancePercentage.toFixed(2)}%
                      </td>
                    </>
                  )}
                  {isTakingAttendance && (
                    <td className="border p-2">
                      {/* Checkbox to mark attendance for today */}
                      <input
                        type="checkbox"
                        checked={
                          attendanceData[student.id]?.[selectedDate] ===
                          'Present'
                        }
                        onChange={(e) =>
                          handleAttendanceChange(student.id, e.target.checked)
                        }
                        className="border p-1"
                      />
                      <label className="ml-2">Present</label>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Take Attendance Button */}
      {!isTakingAttendance && (
        <div className="flex justify-center items-center mt-6">
          <button
            className="btn bg-blue-500 text-white p-2 rounded-md"
            onClick={() => setIsTakingAttendance(true)}
          >
            Take Attendance for today
          </button>
        </div>
      )}

      {/* Save Attendance Button */}
      {isTakingAttendance && (
        <div className="flex justify-between items-center mt-6">
          <button
            className="btn bg-green-500 text-white p-2 rounded-md"
            onClick={handleSaveAttendance}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;
