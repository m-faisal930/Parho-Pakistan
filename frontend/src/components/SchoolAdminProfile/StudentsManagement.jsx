import React, { useState } from 'react';
import {
  FaSearch,
  FaEdit,
  FaUserPlus,
  FaUpload,
  FaDownload,
  FaTrash,
  FaPlus,
} from 'react-icons/fa';
import { saveAs } from 'file-saver';

const StudentsManagement = () => {
  const [students, setStudents] = useState([
    { name: 'Ali Raza', class: '10th', regNo: 'STU1001', sponsored: 'Yes' },
    { name: 'Sarah Ahmed', class: '9th', regNo: 'STU1002', sponsored: 'No' },
    { name: 'Usman Khan', class: '10th', regNo: 'STU1003', sponsored: 'Yes' },
    { name: 'Hina Tariq', class: '8th', regNo: 'STU1004', sponsored: 'No' },
  ]);

  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    regNo: '',
    sponsored: 'No',
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.class && newStudent.regNo) {
      setStudents([...students, newStudent]);
      setNewStudent({ name: '', class: '', regNo: '', sponsored: 'No' });
    }
  };

  const handleRemoveStudent = (regNo) => {
    setStudents(students.filter((student) => student.regNo !== regNo));
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.class.toLowerCase().includes(search.toLowerCase()) ||
      student.sponsored.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
    const csvData = students
      .map((s) => `${s.name},${s.class},${s.regNo},${s.sponsored}`)
      .join('\n');
    const blob = new Blob([`Name,Class,RegNo,Sponsored\n${csvData}`], {
      type: 'text/csv;charset=utf-8;',
    });
    saveAs(blob, 'students.csv');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Student Management</h2>

      {/* Search & Actions */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, class, sponsorship..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
            <FaUpload /> Bulk Upload
          </button>
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <FaDownload /> Export Data
          </button>
        </div>
      </div>

      {/* Add New Student */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Add a New Student</h3>
        <div className="grid grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Class"
            value={newStudent.class}
            onChange={(e) =>
              setNewStudent({ ...newStudent, class: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Reg No"
            value={newStudent.regNo}
            onChange={(e) =>
              setNewStudent({ ...newStudent, regNo: e.target.value })
            }
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddStudent}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Student List Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Reg No</th>
              <th className="p-2 border">Sponsorship</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.class}</td>
                <td className="p-2 border">{student.regNo}</td>
                <td className="p-2 border">{student.sponsored}</td>
                <td className="p-2 border flex justify-center gap-3">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-yellow-600"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleRemoveStudent(student.regNo)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-red-600"
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Profile Details */}
      {selectedStudent && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Student Profile</h3>
          <p>
            <strong>Name:</strong> {selectedStudent.name}
          </p>
          <p>
            <strong>Class:</strong> {selectedStudent.class}
          </p>
          <p>
            <strong>Reg No:</strong> {selectedStudent.regNo}
          </p>
          <p>
            <strong>Sponsorship:</strong> {selectedStudent.sponsored}
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => setSelectedStudent(null)}
          >
            Close Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
