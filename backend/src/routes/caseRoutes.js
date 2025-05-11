const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController/caseController');
const Case = require('../models/caseModel');

// Create a new case
router.post('/add', caseController.addCase);

// Get all cases
router.get('/', caseController.getAllCases);

// In your backend route
router.get('/top', async (req, res) => {
  try {
    // Example: Get top cases by urgency or other criteria
    const cases = await Case.find()
      .sort({ urgency_level: -1, createdAt: -1 }) // Sort by urgency and recency
      .limit(parseInt(req.query.limit) || 4);
    
    res.json({ success: true, cases });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all cases for a specific student
router.get('/student/:studentId', caseController.getCasesByStudentId);

// Get a single case by ID
router.get('/:id', caseController.getCaseById);

// Update a case
router.put('/update/:id', caseController.updateCase);

// Delete a case
router.delete('/delete/:id', caseController.deleteCase);

module.exports = router;
