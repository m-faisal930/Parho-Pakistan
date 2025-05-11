// routes/userRoutes.js
const express = require('express');
const User = require('../models/userModel');
const userController = require('../controllers/userController');
const router = express.Router();

// Find total number of students
router.get("/total", async (req, res) => {
  try {
    const totalDonors = await User.countDocuments();
    res.status(200).json({ totalDonors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// get count of users
// router.get('/total', userController.getUserCount);


module.exports = router;