import React, { useState } from 'react';
import {
  FaDollarSign,
  FaUser,
  FaCheck,
  FaTimes,
  FaChartLine,
  FaFileCsv,
  FaFilePdf,
} from 'react-icons/fa';

const SponsorshipsDonors = () => {
  const [donorsData, setDonorsData] = useState([
    {
      name: 'John Doe',
      contact: 'john@example.com',
      contribution: 1000,
      sponsoredStudents: 5,
    },
    {
      name: 'Jane Smith',
      contact: 'jane@example.com',
      contribution: 1500,
      sponsoredStudents: 8,
    },
    {
      name: 'Mark Lee',
      contact: 'mark@example.com',
      contribution: 1200,
      sponsoredStudents: 4,
    },
    {
      name: 'Sara Khan',
      contact: 'sara@example.com',
      contribution: 800,
      sponsoredStudents: 3,
    },
  ]);

  const [pendingSponsorships, setPendingSponsorships] = useState(5);


  const [sponsorshipRequests, setSponsorshipRequests] = useState([
    { studentName: 'Emma White', requestedAmount: 500, status: 'Pending' },
    { studentName: 'Lucas Black', requestedAmount: 700, status: 'Pending' },
    { studentName: 'Olivia Brown', requestedAmount: 600, status: 'Pending' },
  ]);

  const [paymentTracking, setPaymentTracking] = useState([
    { donor: 'John Doe', amount: 1000, dueDate: '2025-03-01', status: 'Paid' },
    {
      donor: 'Jane Smith',
      amount: 1500,
      dueDate: '2025-03-05',
      status: 'Pending',
    },
    { donor: 'Mark Lee', amount: 1200, dueDate: '2025-03-10', status: 'Paid' },
    {
      donor: 'Sara Khan',
      amount: 800,
      dueDate: '2025-03-15',
      status: 'Pending',
    },
  ]);

  const [loadingReport, setLoadingReport] = useState(false);

  const handleApproveRequest = (index) => {
    const updatedRequests = [...sponsorshipRequests];
    updatedRequests[index].status = 'Approved';
    setSponsorshipRequests(updatedRequests);
  };

  const handleRejectRequest = (index) => {
    const updatedRequests = [...sponsorshipRequests];
    updatedRequests[index].status = 'Rejected';
    setSponsorshipRequests(updatedRequests);
  };


  const handleGenerateReport = (type) => {
    setLoadingReport(true);
    setTimeout(() => {
      setLoadingReport(false);
      alert(`${type} report generated successfully!`);
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Sponsorship & Donors</h2>

      {/* Sponsorship Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <FaDollarSign className="text-green-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Total Sponsored Students</h3>
          <p className="text-xl">30</p>
        </div>
        <div className="flex flex-col items-center">
          <FaUser className="text-orange-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold">
            Pending Sponsorship Requests
          </h3>
          <p className="text-xl">{pendingSponsorships}</p>
        </div>

      </div>

      {/* Student Sponsorship Requests */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Student Sponsorship Requests
        </h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Student Name</th>
              <th className="p-2 text-left">Requested Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sponsorshipRequests.map((request, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{request.studentName}</td>
                <td className="p-2">${request.requestedAmount}</td>
                <td className="p-2">{request.status}</td>
                <td className="p-2">
                  {request.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleApproveRequest(index)}
                        className="bg-green-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectRequest(index)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donor List Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Donor List</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Donor Name</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">Contribution Amount</th>
              <th className="p-2 text-left">Sponsored Students</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donorsData.map((donor, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{donor.name}</td>
                <td className="p-2">{donor.contact}</td>
                <td className="p-2">${donor.contribution}</td>
                <td className="p-2">{donor.sponsoredStudents}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600">
                    Send Thanks Note!
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Tracking */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Tracking</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Donor</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Due Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentTracking.map((payment, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{payment.donor}</td>
                <td className="p-2">${payment.amount}</td>
                <td className="p-2">{payment.dueDate}</td>
                <td className="p-2">
                  <span
                    className={`${
                      payment.status === 'Paid'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donation Trends (Graph) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Donation Trends</h3>
        <div className="h-64 bg-gray-200 flex justify-center items-center rounded-lg">
          <FaChartLine className="text-3xl text-gray-500" />
          <p className="text-xl text-gray-500">
            Monthly donation insights will be displayed here
          </p>
        </div>
      </div>

      {/* Generate Reports */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">Generate Reports</h3>
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

export default SponsorshipsDonors;
