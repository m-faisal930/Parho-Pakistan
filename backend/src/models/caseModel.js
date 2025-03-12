const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    interests: { type: [String], required: true },
    hobbies: { type: [String], required: true },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      default: null,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    donationBreakdown: { type: Map, of: Number, required: true },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      required: true,
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Case', caseSchema);
