import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaEye,
  FaSchool,
  FaFilter,
  FaUser,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [showSchoolList, setShowSchoolList] = useState(false);
  const [assigningSchool, setAssigningSchool] = useState(false);

  // Fetch students and schools
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch students
        const studentsRes = await fetch(
          `${import.meta.env.VITE_BASE_URL}student/all`
        );
        const studentsData = await studentsRes.json();
        if (!studentsRes.ok)
          throw new Error(studentsData.message || 'Failed to fetch students');

        // Fetch schools
        const schoolsRes = await fetch(
          `${import.meta.env.VITE_BASE_URL}school/list`
        );
        const schoolsData = await schoolsRes.json();
        if (!schoolsRes.ok)
          throw new Error(schoolsData.message || 'Failed to fetch schools');

        setStudents(studentsData.data);
        setSchools(schoolsData.schools);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Assign student to school
  const assignToSchool = async (studentId, schoolId) => {
    try {
      setAssigningSchool(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}student/update/${studentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ schoolId }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Assignment failed');

      // Update local state
      setStudents(
        students.map((student) =>
          student._id === studentId ? { ...student, schoolId } : student
        )
      );

      if (selectedStudent && selectedStudent._id === studentId) {
        setSelectedStudent({ ...selectedStudent, schoolId });
      }

      toast.success('Student assigned to school successfully');
      setShowSchoolList(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAssigningSchool(false);
    }
  };

  // Filter students based on search and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.city &&
        student.city.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // View student details
  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setViewMode('detail');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (viewMode === 'detail' && selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setViewMode('list')}
            className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            ← Back to List
          </button>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 bg-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {selectedStudent.fullName}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedStudent.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : selectedStudent.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>
              <p className="mt-2 flex items-center">
                <FaSchool className="mr-2" />
                {selectedStudent.schoolId
                  ? schools.find((s) => s._id === selectedStudent.schoolId)
                      ?.schoolName || 'School not found'
                  : 'Not assigned to any school'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Personal Information
                  </h3>
                  <div className="mt-1 space-y-2">
                    <p className="flex items-center">
                      <FaUser className="mr-2 text-indigo-500" />{' '}
                      {selectedStudent.gender}
                    </p>
                    <p className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-indigo-500" />
                      {new Date(
                        selectedStudent.dateOfBirth
                      ).toLocaleDateString()}
                    </p>
                    <p className="flex items-center">
                      <FaPhone className="mr-2 text-indigo-500" />{' '}
                      {selectedStudent.contactNumber}
                    </p>
                    <p className="flex items-center">
                      <FaEnvelope className="mr-2 text-indigo-500" />{' '}
                      {selectedStudent.email}
                    </p>
                    <p className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                      {selectedStudent.city || selectedStudent.schoolAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Guardian Information
                  </h3>
                  <div className="mt-1 space-y-2">
                    <p>Name: {selectedStudent.guardianName}</p>
                    <p>Contact: {selectedStudent.guardianContact}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Academic Information
                  </h3>
                  <div className="mt-1 space-y-2">
                    <p>Current School: {selectedStudent.currentSchool}</p>
                    <p>Grade: {selectedStudent.currentGrade}</p>
                    {selectedStudent.areasOfInterest && (
                      <p>Interests: {selectedStudent.areasOfInterest}</p>
                    )}
                    {selectedStudent.careerAspiration && (
                      <p>Aspiration: {selectedStudent.careerAspiration}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Financial Information
                  </h3>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-500">Monthly Income</p>
                      <p className="text-xl font-bold">
                        {selectedStudent.monthlyFamilyIncome}
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-500">Dependents</p>
                      <p className="text-xl font-bold">
                        {selectedStudent.dependentsCount}
                      </p>
                    </div>
                    {selectedStudent.fundingAmount && (
                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <p className="text-xs text-indigo-500">
                          Funding Needed
                        </p>
                        <p className="text-xl font-bold">
                          {selectedStudent.fundingAmount}
                        </p>
                      </div>
                    )}
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-500">
                        Existing Scholarship
                      </p>
                      <p className="text-xl font-bold">
                        {selectedStudent.existingScholarship ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedStudent.fundingPurpose && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Funding Purpose
                    </h3>
                    <p className="mt-1">{selectedStudent.fundingPurpose}</p>
                  </div>
                )}

                {selectedStudent.profilePicture && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Profile Picture
                    </h3>
                    <img
                      src={selectedStudent.profilePicture}
                      alt="Profile"
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-white border-t flex justify-end space-x-4">
              {!selectedStudent.schoolId && (
                <button
                  onClick={() => setShowSchoolList(!showSchoolList)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <FaSchool className="mr-2" /> Assign to School
                </button>
              )}

              {showSchoolList && (
                <div className="absolute right-6 bottom-20 bg-white shadow-lg rounded-lg p-4 z-10 w-64">
                  <h4 className="font-medium mb-2">Select School</h4>
                  <div className="max-h-60 overflow-y-auto">
                    {schools.map((school) => (
                      <div
                        key={school._id}
                        onClick={() =>
                          assignToSchool(selectedStudent._id, school._id)
                        }
                        className="p-2 hover:bg-indigo-50 cursor-pointer rounded"
                      >
                        {school.schoolName}
                      </div>
                    ))}
                  </div>
                  {assigningSchool && (
                    <div className="text-center py-2 text-sm text-gray-500">
                      Assigning...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-3 text-indigo-600" /> Student Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all student applications and school assignments
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-400" />
            </div>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    School
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Grade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
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
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            {student.profilePicture ? (
                              <img
                                src={student.profilePicture}
                                alt={student.fullName}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <FaUser className="text-indigo-600" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.contactNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.guardianContact}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.schoolId
                            ? schools.find((s) => s._id === student.schoolId)
                                ?.schoolName || 'School not found'
                            : 'Not assigned'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.currentGrade}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : student.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => viewStudentDetails(student)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {!student.schoolId && (
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowSchoolList(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                              title="Assign to School"
                            >
                              <FaSchool />
                            </button>
                          )}
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
                      No students found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* School List Modal */}
        {showSchoolList && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Assign {selectedStudent.fullName} to School
                </h3>
                <button
                  onClick={() => setShowSchoolList(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {schools.map((school) => (
                  <div
                    key={school._id}
                    onClick={() =>
                      assignToSchool(selectedStudent._id, school._id)
                    }
                    className="p-3 border-b hover:bg-indigo-50 cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{school.schoolName}</p>
                      <p className="text-sm text-gray-500">{school.address}</p>
                    </div>
                    {assigningSchool && selectedStudent._id === school._id && (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-500"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
