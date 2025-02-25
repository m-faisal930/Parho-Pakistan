import React, { useState, useEffect } from 'react';
import { FaSave, FaFileCsv, FaFilePdf } from 'react-icons/fa';

const AcademicPerformance = () => {
  const [studentsData, setStudentsData] = useState([
    { id: 1, name: 'John Doe', class: '10A', sponsorshipStatus: 'Active' },
    { id: 2, name: 'Jane Smith', class: '9B', sponsorshipStatus: 'Inactive' },
    { id: 3, name: 'Alex Johnson', class: '11C', sponsorshipStatus: 'Active' },
    { id: 4, name: 'Michael Lee', class: '10A', sponsorshipStatus: 'Inactive' },
    { id: 5, name: 'Sara Davis', class: '11C', sponsorshipStatus: 'Active' },
  ]);

  const [filteredStudents, setFilteredStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marksCategory, setMarksCategory] = useState('quiz');
  const [marksType, setMarksType] = useState('obtained');
  const [totalMarks, setTotalMarks] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter states
  const [searchName, setSearchName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSponsorshipStatus, setSelectedSponsorshipStatus] =
    useState('');

  // Handle filtering students
  const filterStudents = () => {
    let filtered = studentsData;

    // Search filter
    if (searchName) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Class filter
    if (selectedClass) {
      filtered = filtered.filter((student) => student.class === selectedClass);
    }

    // Sponsorship filter
    if (selectedSponsorshipStatus) {
      filtered = filtered.filter(
        (student) => student.sponsorshipStatus === selectedSponsorshipStatus
      );
    }

    setFilteredStudents(filtered);
  };

  // Trigger filter logic when any filter state changes
  useEffect(() => {
    filterStudents();
  }, [searchName, selectedClass, selectedSponsorshipStatus]);

  // Handle selecting a student
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setMarksCategory('quiz');
    setMarksType('obtained');
    setTotalMarks('');
    setObtainedMarks('');
  };

  // Save academic data for selected student
  const handleSaveAcademicData = () => {
    if (!selectedStudent) return alert('Please select a student first.');
    if (
      marksType === 'obtained' &&
      Number(obtainedMarks) > Number(totalMarks)
    ) {
      return alert('Obtained marks cannot exceed total marks.');
    }

    const updatedData = {
      ...selectedStudent,
      [marksCategory]: {
        totalMarks: totalMarks,
        obtainedMarks: obtainedMarks,
      },
    };

    // Simulating saving data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Academic data saved for ${selectedStudent.name}`);
    }, 1000);
  };

  // Render students list
  const renderStudentsList = () => {
    return (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Sponsorship Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.class}</td>
                <td className="px-4 py-2">{student.sponsorshipStatus}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSelectStudent(student)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Academic Performance
        </h2>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="w-full sm:w-auto">
            <label className="block font-medium text-gray-700">
              Search by Name
            </label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter student name"
            />
          </div>

          <div className="w-full sm:w-auto">
            <label className="block font-medium text-gray-700">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Classes</option>
              <option value="10A">10A</option>
              <option value="9B">9B</option>
              <option value="11C">11C</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label className="block font-medium text-gray-700">
              Select Sponsorship Status
            </label>
            <select
              value={selectedSponsorshipStatus}
              onChange={(e) => setSelectedSponsorshipStatus(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Students List */}
        <div className="mb-6">{renderStudentsList()}</div>

        {/* If a student is selected, show the input forms */}
        {selectedStudent && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">
              Add Academic Data for {selectedStudent.name}
            </h3>
            <div className="space-y-4">
              {/* Marks Category Dropdown */}
              <div>
                <label className="block font-medium text-gray-700">
                  Select Marks Category
                </label>
                <select
                  value={marksCategory}
                  onChange={(e) => setMarksCategory(e.target.value)}
                  className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                  <option value="project">Project</option>
                </select>
              </div>

              {/* Marks Type Dropdown */}
              <div>
                <label className="block font-medium text-gray-700">
                  Select Marks Type
                </label>
                <select
                  value={marksType}
                  onChange={(e) => setMarksType(e.target.value)}
                  className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="obtained">Obtained Marks</option>
                  <option value="total">Total Marks</option>
                </select>
              </div>

              {/* Total Marks and Obtained Marks Input Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total marks"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Obtained Marks
                  </label>
                  <input
                    type="number"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter obtained marks"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleSaveAcademicData}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg flex items-center hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicPerformance;
