const express = require('express');
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController/studentController');
const router = express.Router();

// router.get(
//   '/profile/:studentId',
//   getStudentProfile



// );







const { check } = require('express-validator');

router.post(
  '/',
  [
    check('fullName').notEmpty().withMessage('Full Name is required'),
    check('dateOfBirth').isISO8601().withMessage('Invalid date format'),
    check('gender')
      .isIn(['Male', 'Female', 'Other'])
      .withMessage('Invalid gender'),
    check('contactNumber')
      .isMobilePhone()
      .withMessage('Invalid contact number'),
    check('cnicOrBForm')
      .isLength({ min: 13, max: 13 })
      .withMessage('CNIC/B-Form must be 13 digits'),
    check('guardianName').notEmpty().withMessage('Guardian Name is required'),
    check('guardianContact')
      .isMobilePhone()
      .withMessage('Invalid Guardian Contact'),
    check('currentSchool').notEmpty().withMessage('Current School is required'),
    check('currentGrade').notEmpty().withMessage('Current Grade is required'),
    check('monthlyFamilyIncome')
      .notEmpty()
      .withMessage('Monthly Family Income is required'),
    check('dependentsCount')
      .isInt({ min: 0 })
      .withMessage('Dependents Count must be a number'),
    check('existingScholarship')
      .isBoolean()
      .withMessage('Existing Scholarship must be true or false'),
  ],
  addStudent
);









// router.post('/', addStudent);
// Route to get all students
router.get("/all", getAllStudents);

// Route to update a student by ID
router.put("/update/:id", updateStudent);

// Route to delete a student by ID
router.delete("/delete/:id", deleteStudent);

module.exports = router;
