const mongoose = require('mongoose');

const academicPerformanceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    assessmentType: {
      type: String,
      required: true,
      enum: [
        'class_test',
        'monthly_test',
        'term_exam',
        'annual_exam',
        'project',
      ],
    },
    subject: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    comments: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const AcademicPerformance = mongoose.model(
  'AcademicPerformance',
  academicPerformanceSchema
);

module.exports = AcademicPerformance;