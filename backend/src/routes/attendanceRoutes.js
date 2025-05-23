// attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendanceModel');

const Student = require('../models/studentModel');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const { schoolId, date } = req.query;
    const query = { school: schoolId };
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query)
      .populate('student', 'fullName currentGrade profilePicture')
      .sort({ date: -1 });

    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create attendance record
router.post('/', async (req, res) => {
  try {
    const { schoolId, studentId, date, status } = req.body;
    console.log(req.body);

    // Check if student belongs to this school and is sponsored
    const student = await Student.findOne({
      _id: studentId,
      schoolId: schoolId,
      sponsership: true,
      
    });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: 'Student not found or not sponsored',
      });
    }

    // Check if attendance already exists for this date
    const existing = await Attendance.findOne({
      student: studentId,
      date: new Date(date),
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already recorded for this date',
      });
    }

    const attendance = new Attendance({
      student: studentId,
      school: schoolId,
      date: new Date(date),
      status,
    });

    await attendance.save();
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get students for attendance
router.get('/students', async (req, res) => {
  try {
    const { schoolId } = req.query;
    const students = await Student.find({
      schoolId: schoolId,
      sponsership: true,
      status: 'approved',
    }).select('fullName currentGrade profilePicture');

    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
