const express = require('express');
const {
  addPerformanceRecord,
  getPerformanceRecords,
  updatePerformanceRecord,
  deletePerformanceRecord,
} = require('../controllers/academicPerformanceController');
const { body, param } = require('express-validator');

const router = express.Router();

// Add performance record
router.post(
  '/',
  [
    body('schoolId').notEmpty().withMessage('School ID is required'),
    body('studentId').notEmpty().withMessage('Student ID is required'),
    body('assessmentType')
      .notEmpty()
      .withMessage('Assessment type is required')
      .isIn([
        'class_test',
        'monthly_test',
        'term_exam',
        'annual_exam',
        'project',
      ])
      .withMessage('Invalid assessment type'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('marks')
      .notEmpty()
      .withMessage('Marks are required')
      .isFloat({ min: 0, max: 100 })
      .withMessage('Marks must be between 0 and 100'),
  ],
  addPerformanceRecord
);

// Get performance records
router.get('/:schoolId', getPerformanceRecords);

// Update performance record
router.put(
  '/:id',
  [
    body('assessmentType')
      .optional()
      .isIn([
        'class_test',
        'monthly_test',
        'term_exam',
        'annual_exam',
        'project',
      ])
      .withMessage('Invalid assessment type'),
    body('subject')
      .optional()
      .notEmpty()
      .withMessage('Subject cannot be empty'),
    body('marks')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Marks must be between 0 and 100'),
  ],
  updatePerformanceRecord
);

// Delete performance record
router.delete('/:id', deletePerformanceRecord);

module.exports = router;
