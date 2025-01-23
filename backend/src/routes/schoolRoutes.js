const express = require('express');
const { addStudent } = require('../controllers/schoolController/schoolController');

const router = express.Router();

router.post(
  '/add-student',
  addStudent
);

module.exports = router;
