const express = require('express');
const { getStudentProfile } = require('../controllers/studentController/studentController');
const router = express.Router();

router.get(
  '/profile/:studentId',
  getStudentProfile
);

module.exports = router;
