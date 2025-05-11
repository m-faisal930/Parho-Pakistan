const { boolean } = require('joi');
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    profilePicture: { type: String }, // Optional, user can upload later
    email: { type: String, unique: true, sparse: true, match: /\S+@\S+\.\S+/ }, // Optional but should be valid if provided
    contactNumber: { type: String, required: true, match: /^[0-9]{10,15}$/ }, // Ensures valid contact number
    cnicOrBForm: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{13}$/,
    }, // Pakistani CNIC validation
    guardianName: { type: String, required: true },
    guardianContact: { type: String, required: true, match: /^[0-9]{10,15}$/ }, // Ensures valid number

    // Educational Information
    currentSchool: { type: String, required: true },
    currentGrade: { type: String, required: true },
    schoolAddress: { type: String, required: true },
    city: { type: String, required: true },
    // previousAcademicRecords: { type: String }, // Optional file upload
    areasOfInterest: { type: String }, // Optional, can be updated later
    careerAspiration: { type: String }, // Optional
    passportPhoto: { type: String }, // Optional, user can upload later
    studentId: { type: String }, // Optional, can be generated later
    incomeProof: { type: String }, // Optional, user can upload later
    recommendation: { type: String }, // Optional, user can upload later

    // Financial Information
    monthlyFamilyIncome: { type: String, required: true },
    dependentsCount: { type: Number, required: true, min: 0 },
    existingScholarship: { type: Boolean, required: true },
    fundingAmount: { type: String }, // Optional, as not every student will apply for funding
    fundingPurpose: { type: String }, // Optional, can be updated later
    // supportingDocuments: { type: String }, // Optional file upload
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      default: null,
    },
    sponsership: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
