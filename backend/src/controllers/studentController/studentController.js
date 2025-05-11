const Student = require('../../models/studentModel');


// const { validationResult } = require('express-validator');

// @desc   Add a new student
// @route  POST /api/students
// @access Public
const addStudent = async (req, res) => {
  

  // console.log('Request Body:', req.body); // Log the request body for debugging
  try {
    // console.log('Request Body:', req); // Log the request body for debugging
    // Validate request body
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
      //   return res.status(400).json({ success: false, errors: errors.array() });
      // }
      
      const { cnicOrBForm, email, contactNumber } = req.body;
      
      // Check if student with the same CNIC/B-Form already exists
      const existingStudent = await Student.findOne({ cnicOrBForm });
      if (existingStudent) {
        // console.log('Student data:', req.body); // Log the student data for debugging
        return res
        .status(409)
        .json({
          success: false,
          message: 'Student with this CNIC/B-Form already exists.',
        });
      }
    
    // Check if email is already registered (optional)
    if (email) {
      const existingEmail = await Student.findOne({ email });
      if (existingEmail) {
        return res
          .status(409)
          .json({ success: false, message: 'Email is already in use.' });
      }
    }

    // Sanitize input data (prevent NoSQL injection)
    const studentData = {
      fullName: req.body.name.trim(),
      dateOfBirth: req.body.dob,
      gender: req.body.gender,
      profilePicture: req.body.profilePicture || '',
      email: req.body.email?.trim(),
      contactNumber: req.body.contactNumber.trim(),
      cnicOrBForm: req.body.cnicOrBForm.trim(),
      guardianName: req.body.guardianName.trim(),
      guardianContact: req.body.guardianContact.trim(),
      currentSchool: req.body.schoolName.trim(),
      currentGrade: req.body.grade.trim(),
      schoolAddress: req.body.schoolAddress.trim(),
      city: req.body.city.trim(),
      // previousAcademicRecords: req.body.previousAcademicRecords || '',
      areasOfInterest: req.body.areaOfInterest || '',
      careerAspiration: req.body.careerAspirations || '',
      monthlyFamilyIncome: req.body.monthIncome.trim(),
      dependentsCount: req.body.noOfDependents,
      existingScholarship: req.body.existingScholarship,
      fundingAmount: req.body.amountNeeded || '',
      fundingPurpose: req.body.purposeOfFunding || '',
      // supportingDocuments: req.body.supportingDocuments || '',
      incomeProof: req.body.incomeProof || '', // Optional, user can upload later
      recommendation: req.body.recommendation || '', // Optional, user can upload later

      studentId: req.body.studentId || '', // Optional, can be generated later
      passportPhoto: req.body.passportPhoto || '', // Optional, user can upload later

    };
    // console.log(studentData);

    // Create and save student
    const student = new Student(studentData);
    await student.save();
    // console.log(student)

    res
      .status(201)
      .json({ success: true, message: 'Student added successfully', student });
      
  } catch (error) {
    console.error('Error adding student:', error);
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};



// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving students", error: error.message });
    }
};

// Update a student by ID
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(updatedStudent){
            // console.log(updatedStudent);
            res.status(200).json({ success: true, message: "Student updated successfully", data: updatedStudent });
        }

        else {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating student", error: error.message });
    }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting student", error: error.message });
    }
};
// get student by id
const getStudentById = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId);
        console.log(student);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving student", error: error.message });
    }
}





module.exports = { addStudent, getAllStudents, updateStudent, deleteStudent, getStudentById };