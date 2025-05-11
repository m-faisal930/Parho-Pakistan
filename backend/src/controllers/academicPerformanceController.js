const AcademicPerformance = require('../models/AcademicPerformance');
const  Student = require('../models/studentModel');
const  { validationResult } = require('express-validator');

// Add academic performance record
const addPerformanceRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      schoolId,
      studentId,
      assessmentType,
      subject,
      marks,
      date,
      comments,
    } = req.body;

    // Check if student exists and belongs to the school
    const student = await Student.findOne({ _id: studentId, school: schoolId });
    if (!student) {
      return res
        .status(404)
        .json({ message: 'Student not found in this school' });
    }

    const newRecord = new AcademicPerformance({
      school: schoolId,
      student: studentId,
      assessmentType,
      subject,
      marks,
      date: date || new Date(),
      comments,
    });

    await newRecord.save();

    res.status(201).json({
      message: 'Academic performance record added successfully',
      data: newRecord,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all performance records for a school
 const getPerformanceRecords = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { studentId, fromDate, toDate, assessmentType, subject } = req.query;

    let query = { school: schoolId };

    if (studentId) query.student = studentId;
    if (assessmentType) query.assessmentType = assessmentType;
    if (subject) query.subject = subject;
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = new Date(fromDate);
      if (toDate) query.date.$lte = new Date(toDate);
    }

    const records = await AcademicPerformance.find(query)
      .populate('student', 'fullName currentGrade profilePicture')
      .sort({ date: -1 });

    res.status(200).json({
      message: 'Performance records fetched successfully',
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update performance record
 const updatePerformanceRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { assessmentType, subject, marks, date, comments } = req.body;

    const updatedRecord = await AcademicPerformance.findByIdAndUpdate(
      id,
      { assessmentType, subject, marks, date, comments },
      { new: true }
    ).populate('student', 'fullName currentGrade profilePicture');

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({
      message: 'Performance record updated successfully',
      data: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete performance record
 const deletePerformanceRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await AcademicPerformance.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({
      message: 'Performance record deleted successfully',
      data: deletedRecord,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    addPerformanceRecord,
    getPerformanceRecords,
    updatePerformanceRecord,
    deletePerformanceRecord,
    };
