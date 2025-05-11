// attendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);
