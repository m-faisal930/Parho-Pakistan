
import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
  FaFileAlt,
  FaFilter,
  FaUser,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const StudentsManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending'); // 'pending', 'approved', 'rejected'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [activeTab, setActiveTab] = useState('unverified'); // 'unverified' or 'verified'

  const {schoolId} = useParams(); // Assuming you're using react-router-dom for routing



  const [showCaseForm, setShowCaseForm] = useState(false);
  const [caseFormData, setCaseFormData] = useState({
    title: '',
    description: '',
    interests: [],
    hobbies: [],
    donationBreakdown: {
      'Tuition Fees': 0,
      Books: 0,
      Transport: 0,
    },
    tags: [],
    status: 'pending',
  });
  const [currentInterest, setCurrentInterest] = useState('');
  const [currentHobby, setCurrentHobby] = useState('');
  const [currentTag, setCurrentTag] = useState('');


  // Fetch students assigned to this school
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // Replace 'school-id-here' with actual school ID from auth context or props
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}student/all`
        );
        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
        } else {
          throw new Error('Failed to fetch students');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Update student status
  const updateStudentStatus = async (studentId, newStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}student/update/${studentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Update failed');

      setStudents(
        students.map((student) =>
          student._id === studentId
            ? { ...student, status: newStatus }
            : student
        )
      );

      if (selectedStudent && selectedStudent._id === studentId) {
        setSelectedStudent({ ...selectedStudent, status: newStatus });
      }

      toast.success(`Student status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

const createCaseForStudent = (student) => {
  setSelectedStudent(student);
  setShowCaseForm(true);
};

  // Filter students based on search and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.city &&
        student.city.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === 'unverified') {
      return matchesSearch && student.status === 'pending';
    } else {
      return matchesSearch && student.status !== 'pending';
    }
  });

  // View student details
  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setViewMode('detail');
  };

  const handleCaseInputChange = (e) => {
    const { name, value } = e.target;
    setCaseFormData({
      ...caseFormData,
      [name]: value,
    });
  };

  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setCaseFormData({
      ...caseFormData,
      donationBreakdown: {
        ...caseFormData.donationBreakdown,
        [name]: parseInt(value) || 0,
      },
    });
  };

  const addInterest = () => {
    if (
      currentInterest.trim() &&
      !caseFormData.interests.includes(currentInterest.trim())
    ) {
      setCaseFormData({
        ...caseFormData,
        interests: [...caseFormData.interests, currentInterest.trim()],
      });
      setCurrentInterest('');
    }
  };

  const removeInterest = (interest) => {
    setCaseFormData({
      ...caseFormData,
      interests: caseFormData.interests.filter((i) => i !== interest),
    });
  };

  const addHobby = () => {
    if (
      currentHobby.trim() &&
      !caseFormData.hobbies.includes(currentHobby.trim())
    ) {
      setCaseFormData({
        ...caseFormData,
        hobbies: [...caseFormData.hobbies, currentHobby.trim()],
      });
      setCurrentHobby('');
    }
  };

  const removeHobby = (hobby) => {
    setCaseFormData({
      ...caseFormData,
      hobbies: caseFormData.hobbies.filter((h) => h !== hobby),
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !caseFormData.tags.includes(currentTag.trim())) {
      setCaseFormData({
        ...caseFormData,
        tags: [...caseFormData.tags, currentTag.trim()],
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tag) => {
    setCaseFormData({
      ...caseFormData,
      tags: caseFormData.tags.filter((t) => t !== tag),
    });
  };

  const handleCaseSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/case/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...caseFormData,
          studentId: selectedStudent._id, // Use the selected student's ID
          schoolId: schoolId, // Replace with actual school ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Case created successfully!');
        setShowCaseForm(false);
        // Reset form
        setCaseFormData({
          title: '',
          description: '',
          interests: [],
          hobbies: [],
          donationBreakdown: {
            'Tuition Fees': 0,
            Books: 0,
            Transport: 0,
          },
          tags: [],
          status: 'pending',
        });
      } else {
        throw new Error(data.message || 'Failed to create case');
      }
    } catch (error) {
      toast.error(error.message);
    }
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
              <p className="mt-2">
                {selectedStudent.currentGrade} at{' '}
                {selectedStudent.currentSchool}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Personal Information
                  </h3>
                  <div className="mt-1 space-y-2">
                    <p>
                      <strong>Date of Birth:</strong>{' '}
                      {new Date(
                        selectedStudent.dateOfBirth
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Gender:</strong> {selectedStudent.gender}
                    </p>
                    <p>
                      <strong>Contact:</strong> {selectedStudent.contactNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedStudent.email}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedStudent.schoolAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Guardian Information
                  </h3>
                  <div className="mt-1 space-y-2">
                    <p>
                      <strong>Name:</strong> {selectedStudent.guardianName}
                    </p>
                    <p>
                      <strong>Contact:</strong>{' '}
                      {selectedStudent.guardianContact}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Academic Information
                  </h3>
                  <div className="mt-1 space-y-2">
                    <p>
                      <strong>Current School:</strong>{' '}
                      {selectedStudent.currentSchool}
                    </p>
                    <p>
                      <strong>Grade:</strong> {selectedStudent.currentGrade}
                    </p>
                    {selectedStudent.areasOfInterest && (
                      <p>
                        <strong>Areas of Interest:</strong>{' '}
                        {selectedStudent.areasOfInterest}
                      </p>
                    )}
                    {selectedStudent.careerAspiration && (
                      <p>
                        <strong>Career Aspiration:</strong>{' '}
                        {selectedStudent.careerAspiration}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Financial Information
                  </h3>
                  <div className="mt-1 space-y-2">
                    <p>
                      <strong>Monthly Family Income:</strong>{' '}
                      {selectedStudent.monthlyFamilyIncome}
                    </p>
                    <p>
                      <strong>Dependents:</strong>{' '}
                      {selectedStudent.dependentsCount}
                    </p>
                    <p>
                      <strong>Existing Scholarship:</strong>{' '}
                      {selectedStudent.existingScholarship ? 'Yes' : 'No'}
                    </p>
                    {selectedStudent.fundingAmount && (
                      <p>
                        <strong>Funding Needed:</strong>{' '}
                        {selectedStudent.fundingAmount}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t flex justify-end space-x-4">
              {selectedStudent.status === 'pending' && (
                <>
                  <button
                    onClick={() =>
                      updateStudentStatus(selectedStudent._id, 'approved')
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <FaCheck className="mr-2" /> Approve
                  </button>
                  <button
                    onClick={() =>
                      updateStudentStatus(selectedStudent._id, 'rejected')
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <FaTimes className="mr-2" /> Reject
                  </button>
                </>
              )}
              {selectedStudent.status === 'approved' &&
                !selectedStudent.sponsored && (
                  <button
                    onClick={() => createCaseForStudent(selectedStudent)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <FaFileAlt className="mr-2" /> Create Case
                  </button>
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
              Student Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all students assigned to your school
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
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

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('unverified')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'unverified'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500'
            }`}
          >
            Unverified Students
          </button>
          <button
            onClick={() => setActiveTab('verified')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'verified'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500'
            }`}
          >
            Verified Students
          </button>
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sponsored
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.sponsored
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {student.sponsored ? 'Yes' : 'No'}
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
                          {activeTab === 'verified' &&
                            student.status === 'approved' &&
                            !student.sponsored && (
                              <button
                                onClick={() => createCaseForStudent(student)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                                title="Create Case"
                              >
                                <FaFileAlt />
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
                      No{' '}
                      {activeTab === 'unverified' ? 'unverified' : 'verified'}{' '}
                      students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showCaseForm && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Create Case for {selectedStudent.fullName}
              </h3>
              <button
                onClick={() => setShowCaseForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCaseSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Case Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={caseFormData.title}
                  onChange={handleCaseInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="description"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={caseFormData.description}
                  onChange={handleCaseInputChange}
                  rows="4"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Interests</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={currentInterest}
                    onChange={(e) => setCurrentInterest(e.target.value)}
                    className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Add interest"
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {caseFormData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Hobbies</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={currentHobby}
                    onChange={(e) => setCurrentHobby(e.target.value)}
                    className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Add hobby"
                  />
                  <button
                    type="button"
                    onClick={addHobby}
                    className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {caseFormData.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {hobby}
                      <button
                        type="button"
                        onClick={() => removeHobby(hobby)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-700 mb-2">Donation Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(caseFormData.donationBreakdown).map(
                    ([category, amount]) => (
                      <div key={category} className="border p-3 rounded">
                        <label className="block text-gray-700 mb-1">
                          {category}
                        </label>
                        <input
                          type="number"
                          name={category}
                          value={amount}
                          onChange={handleDonationChange}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          min="0"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tags</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Add tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {caseFormData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCaseForm(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;