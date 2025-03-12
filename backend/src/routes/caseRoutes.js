const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController/caseController');

// Create a new case
router.post('/add', caseController.addCase);

// Get all cases for a specific student
router.get('/student/:studentId', caseController.getCasesByStudentId);

// Get a single case by ID
router.get('/:id', caseController.getCaseById);

// Update a case
router.put('/update/:id', caseController.updateCase);

// Delete a case
router.delete('/delete/:id', caseController.deleteCase);

module.exports = router;
