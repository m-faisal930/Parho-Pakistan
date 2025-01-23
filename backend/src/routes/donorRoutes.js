const express = require('express');
const { sponsorStudent } = require('../controllers/donorController/donorController');


const router = express.Router();

router.post(
  '/sponsor/:studentId',
  sponsorStudent
);

module.exports = router;
