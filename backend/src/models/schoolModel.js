const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    schoolType: {
      type: String,
      enum: ['private', 'public', 'Semi Public'],
      required: true,
    },
    city: { type: String, required: true },
    contactNo: { type: String, required: true },
    website: { type: String },
    principalName: { type: String, required: true },
    managementType: {
      type: String,
      enum: ['trust', 'government', 'private'],
      required: true,
    },
    noOfStudents: { type: Number, required: true },
    noOfStaff: { type: Number, required: true },
    courses: { type: [String] },
    languages: { type: [String] },
    studentTeacherRatio: { type: String },
    tuitionAndFees: { type: String },
    additionalFacilities: { type: String },
    transportAvailability: { type: String },
    scholarshipsOrFinancialAssistance: { type: String },
    registrationCert: { type: String, required: false },
    accreditationDocs: { type: String, required: false },
    principalIdProof: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },

  { timestamps: true }
);
// Ensure unique email at the database level
SchoolSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('School', SchoolSchema);
