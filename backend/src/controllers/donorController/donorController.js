const sponsorStudent = async (req, res) => {
  const { studentId } = req.params;
  const { donorId, amount } = req.body;
  // Mock response (replace with DB query)
  res.sendResponse(200, true, {
    message: `Donor ${donorId} sponsored student ${studentId} with ${amount}`,
  });
};

module.exports = { sponsorStudent };
