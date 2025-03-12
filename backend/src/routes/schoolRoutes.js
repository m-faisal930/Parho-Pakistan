const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController/schoolController');

// Define routes
router.post('/add', schoolController.addSchool);
router.get('/list', schoolController.getAllSchools);
router.get('/:id', schoolController.getSchoolById);
router.put('/update/:id', schoolController.updateSchool);
router.delete('/delete/:id', schoolController.deleteSchool);

module.exports = router;
