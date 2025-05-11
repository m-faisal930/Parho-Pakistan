import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaSearch,
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaChartLine,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcademicPerformance = ({ school_id }) => {
  const [students, setStudents] = useState([]);
  const [performanceRecords, setPerformanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId] = useState(school_id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    assessmentType: 'class_test',
    subject: '',
    marks: '',
    date: new Date().toISOString().split('T')[0],
    comments: '',
  });

  const assessmentTypes = [
    { value: 'class_test', label: 'Class Test' },
    { value: 'monthly_test', label: 'Monthly Test' },
    { value: 'term_exam', label: 'Term Exam' },
    { value: 'annual_exam', label: 'Annual Exam' },
    { value: 'project', label: 'Project' },
  ];

  // Fetch students and performance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch students
        const studentsRes = await fetch(
          `http://localhost:3000/attendance/students?schoolId=${schoolId}`
        );
        const studentsData = await studentsRes.json();
        if (!studentsRes.ok) throw new Error(studentsData.message);

        // Fetch performance records
        const performanceRes = await fetch(
          `http://localhost:3000/academic-performance/${schoolId}?fromDate=${selectedDate}`
        );
        const performanceData = await performanceRes.json();
        if (!performanceRes.ok) throw new Error(performanceData.message);

        setStudents(studentsData.data);
        setPerformanceRecords(performanceData.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, schoolId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit performance record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:3000/academic-performance',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            schoolId,
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setPerformanceRecords([data.data, ...performanceRecords]);
      toast.success('Performance record added successfully');
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update performance record
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/academic-performance/${currentRecord._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assessmentType: formData.assessmentType,
            subject: formData.subject,
            marks: formData.marks,
            date: formData.date,
            comments: formData.comments,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setPerformanceRecords(
        performanceRecords.map((record) =>
          record._id === currentRecord._id ? data.data : record
        )
      );
      toast.success('Performance record updated successfully');
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete performance record
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(
          `http://localhost:3000/academic-performance/${id}`,
          {
            method: 'DELETE',
          }
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        setPerformanceRecords(
          performanceRecords.filter((record) => record._id !== id)
        );
        toast.success('Performance record deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Open edit modal
  const openEditModal = (record) => {
    setCurrentRecord(record);
    setFormData({
      studentId: record.student._id,
      assessmentType: record.assessmentType,
      subject: record.subject,
      marks: record.marks,
      date: new Date(record.date).toISOString().split('T')[0],
      comments: record.comments || '',
    });
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      studentId: '',
      assessmentType: 'class_test',
      subject: '',
      marks: '',
      date: new Date().toISOString().split('T')[0],
      comments: '',
    });
    setCurrentRecord(null);
  };

  // Filter students based on search
  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter records based on search
  const filteredRecords = performanceRecords.filter((record) =>
    record.student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold mb-6">Academic Performance</h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('add')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              <FaPlus /> Add Performance
            </button>
            <button
              onClick={() => setViewMode('view')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              <FaChartLine /> View Records
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Add Performance View */}
        {viewMode === 'add' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Add Academic Performance
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <FaPlus /> Add New Record
              </button>
            </div>

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50">
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
                          <button
                            onClick={() => {
                              setFormData({
                                ...formData,
                                studentId: student._id,
                              });
                              setIsModalOpen(true);
                            }}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md flex items-center gap-1 hover:bg-blue-200"
                          >
                            <FaPlus /> Add Record
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Records */}
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
                      Assessment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <tr key={record._id} className="hover:bg-gray-50">
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
                              <div className="text-sm text-gray-500">
                                {record.student.currentGrade}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {assessmentTypes.find(
                              (type) => type.value === record.assessmentType
                            )?.label || record.assessmentType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {record.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-semibold ${
                              record.marks >= 80
                                ? 'text-green-600'
                                : record.marks >= 50
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {record.marks}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(record)}
                              className="p-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(record._id)}
                              className="p-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No performance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto mt-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h3 className="text-xl font-semibold">
                    {currentRecord
                      ? 'Edit Performance Record'
                      : 'Add Performance Record'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <form
                  onSubmit={currentRecord ? handleUpdate : handleSubmit}
                  className="space-y-4"
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Student</label>
                    {currentRecord ? (
                      <div className="p-2 bg-gray-100 rounded">
                        {currentRecord.student.fullName}
                      </div>
                    ) : (
                      <select
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Student</option>
                        {students.map((student) => (
                          <option key={student._id} value={student._id}>
                            {student.fullName} ({student.currentGrade})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Assessment Type
                    </label>
                    <select
                      name="assessmentType"
                      value={formData.assessmentType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {assessmentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Marks (%)
                    </label>
                    <input
                      type="number"
                      name="marks"
                      value={formData.marks}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Comments (Optional)
                    </label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        resetForm();
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      {currentRecord ? (
                        <>
                          <FaEdit /> Update
                        </>
                      ) : (
                        <>
                          <FaCheck /> Submit
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicPerformance;
