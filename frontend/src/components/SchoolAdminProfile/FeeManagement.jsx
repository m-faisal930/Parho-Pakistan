import React, { useState } from 'react';
import {
  FaDollarSign,
  FaFileCsv,
  FaFilePdf,
  FaSearch,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

const FeeManagement = () => {
  const [feesData, setFeesData] = useState([
    {
      name: 'John Doe',
      class: '10A',
      feeAmount: 500,
      dueDate: '2025-03-01',
      status: 'Paid',
    },
    {
      name: 'Jane Smith',
      class: '9B',
      feeAmount: 400,
      dueDate: '2025-03-05',
      status: 'Pending',
    },
    {
      name: 'Mark Lee',
      class: '12C',
      feeAmount: 600,
      dueDate: '2025-03-10',
      status: 'Paid',
    },
    {
      name: 'Sara Khan',
      class: '11A',
      feeAmount: 550,
      dueDate: '2025-03-15',
      status: 'Pending',
    },
  ]);

  const [totalFeesCollected, setTotalFeesCollected] = useState(1100);
  const [pendingFees, setPendingFees] = useState(550);
  const [scholarshipsGiven, setScholarshipsGiven] = useState(300);

  const [searchQuery, setSearchQuery] = useState('');
  const [loadingReport, setLoadingReport] = useState(false);

  const handleManualEntry = (e) => {
    // Handle manual fee entry here (add/edit fee data)
  };

  const handleGenerateReport = (type) => {
    setLoadingReport(true);
    setTimeout(() => {
      setLoadingReport(false);
      alert(`${type} report generated successfully!`);
    }, 2000); // Simulate report generation delay
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Fee Management</h2>

      {/* Fee Status Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
        <div className="flex flex-col items-center">
          <FaDollarSign className="text-green-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Total Fees Collected</h3>
          <p className="text-xl">${totalFeesCollected}</p>
        </div>
        <div className="flex flex-col items-center">
          <FaTimes className="text-red-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Pending Fees</h3>
          <p className="text-xl">${pendingFees}</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCheck className="text-blue-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Scholarships Given</h3>
          <p className="text-xl">${scholarshipsGiven}</p>
        </div>
      </div>

      {/* Student Fee Records */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex-grow overflow-auto">
        <h3 className="text-lg font-semibold mb-4">Student Fee Records</h3>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Name, Class, Status"
            onChange={handleSearch}
            value={searchQuery}
            className="p-2 border rounded-lg w-full md:w-1/3"
          />
        </div>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Class</th>
              <th className="p-2 text-left">Fee Amount</th>
              <th className="p-2 text-left">Due Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feesData
              .filter(
                (student) =>
                  student.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  student.class
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.class}</td>
                  <td className="p-2">${student.feeAmount}</td>
                  <td className="p-2">{student.dueDate}</td>
                  <td className="p-2">
                    <span
                      className={`${
                        student.status === 'Paid'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={handleManualEntry}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleManualEntry}
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                    >
                      Mark Paid
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Payment Processing */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Processing</h3>
        <button
          onClick={handleManualEntry}
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
        >
          Manual Fee Entry
        </button>
      </div>

      {/* Report Generation */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-auto flex justify-between items-center">
        <h3 className="text-lg font-semibold">Generate Fee Reports</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => handleGenerateReport('CSV')}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            disabled={loadingReport}
          >
            <FaFileCsv className="inline mr-2" />
            {loadingReport ? 'Generating CSV...' : 'Generate CSV'}
          </button>
          <button
            onClick={() => handleGenerateReport('PDF')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            disabled={loadingReport}
          >
            <FaFilePdf className="inline mr-2" />
            {loadingReport ? 'Generating PDF...' : 'Generate PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;
