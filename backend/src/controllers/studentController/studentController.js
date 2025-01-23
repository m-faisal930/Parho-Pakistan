const getStudentProfile = async (req, res) => {
  const { studentId } = req.params;
  // Mock response (replace with DB query)
  res.sendResponse(200, true, {
    studentId,
    name: 'John Doe',
    progress: '80%',
    fundingStatus: 'Approved',
  });
};

module.exports = { getStudentProfile };
