const Case = require('../../models/caseModel')

// Add a new case
exports.addCase = async (req, res) => {
  try {
    const {
      title,
      description,
      interests,
      hobbies,
      studentId,
      donationBreakdown,
      tags,
      status,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !interests.length ||
      !hobbies.length ||
      !studentId ||
      !donationBreakdown ||
      !status
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'All required fields must be provided.',
        });
    }

    const newCase = new Case({
      title,
      description,
      interests,
      hobbies,
      studentId,
      donationBreakdown,
      tags,
      status,
    });

    await newCase.save();
    res.status(201).json({ success: true, case: newCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all cases for a specific student
exports.getCasesByStudentId = async (req, res) => {
  try {
    const cases = await Case.find({ studentId: req.params.studentId });
    res.status(200).json({ success: true, cases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single case by ID
exports.getCaseById = async (req, res) => {
  try {
    const studentCase = await Case.findById(req.params.id);
    if (!studentCase) {
      return res
        .status(404)
        .json({ success: false, message: 'Case not found' });
    }
    res.status(200).json({ success: true, case: studentCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a case
exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCase) {
      return res
        .status(404)
        .json({ success: false, message: 'Case not found' });
    }
    res.status(200).json({ success: true, updatedCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a case
exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res
        .status(404)
        .json({ success: false, message: 'Case not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
