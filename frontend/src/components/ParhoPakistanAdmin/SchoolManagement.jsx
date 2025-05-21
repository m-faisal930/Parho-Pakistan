import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaFilter,
  FaSchool,
  FaEnvelope,
  FaGlobe,
  FaPhoneAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SchoolManagement = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'

  // Fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}school/list`
        );
        const data = await response.json();
        if (data.success) {
          setSchools(data.schools);
        } else {
          throw new Error('Failed to fetch schools');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Update school status
  const updateSchoolStatus = async (schoolId, newStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}school/update/${schoolId}`,
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

      setSchools(schools.map(school => 
        school._id === schoolId ? { ...school, status: newStatus } : school
      ));
      toast.success(`School status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete school
  const deleteSchool = async (schoolId) => {
    if (!window.confirm('Are you sure you want to delete this school?')) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}school/delete/${schoolId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Delete failed');

      setSchools(schools.filter(school => school._id !== schoolId));
      toast.success('School deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Filter schools based on search and status
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || school.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // View school details
  const viewSchoolDetails = (school) => {
    setSelectedSchool(school);
    setViewMode('detail');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (viewMode === 'detail' && selectedSchool) {
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
                <h1 className="text-2xl font-bold">{selectedSchool.schoolName}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedSchool.status === 'approved' ? 'bg-green-100 text-green-800' :
                  selectedSchool.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedSchool.status}
                </span>
              </div>
              <p className="mt-2">{selectedSchool.address}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                  <div className="mt-1 space-y-2">
                    <p className="flex items-center">
                      <FaEnvelope className="mr-2 text-indigo-500" /> {selectedSchool.email}
                    </p>
                    <p className="flex items-center">
                      
                      <FaPhoneAlt className="mr-2 text-indigo-500" /> {selectedSchool.contactNo}
                    </p>
                    <p className="flex items-center">
                      
                      <FaGlobe className="mr-2 text-indigo-500" /> 
                      <a href={selectedSchool.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                        {selectedSchool.website}
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Principal</h3>
                  <p className="mt-1">{selectedSchool.principalName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">School Type</h3>
                  <p className="mt-1 capitalize">{selectedSchool.schoolType}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Management Type</h3>
                  <p className="mt-1 capitalize">{selectedSchool.managementType}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Statistics</h3>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-500">Students</p>
                      <p className="text-xl font-bold">{selectedSchool.noOfStudents}</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-500">Staff</p>
                      <p className="text-xl font-bold">{selectedSchool.noOfStaff}</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-500">Ratio</p>
                      <p className="text-xl font-bold">{selectedSchool.studentTeacherRatio}</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-500">Tuition</p>
                      <p className="text-xl font-bold">{selectedSchool.tuitionAndFees}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Courses</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedSchool.courses.map((course, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Languages</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedSchool.languages.map((language, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t">
              <h3 className="text-sm font-medium text-gray-500">Facilities</h3>
              <p className="mt-1">{selectedSchool.additionalFacilities}</p>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    selectedSchool.transportAvailability === 'true' ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>Transport Available: {selectedSchool.transportAvailability === 'true' ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    selectedSchool.scholarshipsOrFinancialAssistance === 'true' ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>Financial Assistance: {selectedSchool.scholarshipsOrFinancialAssistance === 'true' ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t flex justify-end space-x-4">
              {selectedSchool.status !== 'approved' && (
                <button
                  onClick={() => updateSchoolStatus(selectedSchool._id, 'approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <FaCheck className="mr-2" /> Approve
                </button>
              )}
              {selectedSchool.status !== 'rejected' && (
                <button
                  onClick={() => updateSchoolStatus(selectedSchool._id, 'rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FaTimes className="mr-2" /> Reject
                </button>
              )}
              <button
                onClick={() => deleteSchool(selectedSchool._id)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-light font-work  p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaSchool className="mr-3 text-indigo-600" /> School Management
            </h1>
            <p className="text-gray-600 mt-2">Manage all registered schools and their status</p>
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
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="overflow-x-scroll">
            <table className="min-w-full divide-y divide-gray-200">

              
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <tr key={school._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <FaSchool className="text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{school.schoolName}</div>
                            <div className="text-sm text-gray-500">{school.principalName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{school.email}</div>
                        <div className="text-sm text-gray-500">{school.contactNo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{school.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{school.noOfStudents}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          school.status === 'approved' ? 'bg-green-100 text-green-800' :
                          school.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {school.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => viewSchoolDetails(school)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {school.status !== 'approved' && (
                            <button
                              onClick={() => updateSchoolStatus(school._id, 'approved')}
                              className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                          )}
                          {school.status !== 'rejected' && (
                            <button
                              onClick={() => updateSchoolStatus(school._id, 'rejected')}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          )}
                          <button
                            onClick={() => deleteSchool(school._id)}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-50"
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
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No schools found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolManagement;