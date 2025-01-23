const addStudent = async (req, res) => {
  const { studentName, grade, schoolId } = req.body;
  // Mock response (replace with DB logic)
  res.sendResponse(201, true, {
    message: `Student ${studentName} added successfully under school ID ${schoolId}`,
  });
};

module.exports = { addStudent };
