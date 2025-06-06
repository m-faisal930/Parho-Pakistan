// controllers/userController.js
const userService = require('../services/userService');
const User = require('../models/userModel'); // Import the User model

// Create User
const createUser = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const user = await userService.createUser(req.body);
    if (!user) {
      return res.sendResponse(500, false, 'User creation failed');
    }
    res.sendResponse(201, true, 'User created successfully', user, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get User Count
const getUserCount = async (req, res) => {
    try {
      const totalDonors = await User.countDocuments();
      res.status(200).json({ totalDonors });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user; // Get tokens from req.user
    const users = await userService.getAllUsers();
    if (!users || users.length === 0) {
      return res.sendResponse(404, false, 'No users found');
    }
    res.sendResponse(200, true, 'Users fetched successfully', users, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user; // Get tokens from req.user
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.sendResponse(404, false, `User with ID ${req.params.id} not found`);
    }
    res.sendResponse(200, true, 'User fetched successfully', user, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user; // Get tokens from req.user
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.sendResponse(404, false, `User with ID ${req.params.id} not found for update`);
    }
    res.sendResponse(200, true, 'User updated successfully', updatedUser, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user; // Get tokens from req.user
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.sendResponse(404, false, `User with ID ${req.params.id} not found for deletion`);
    }
    res.sendResponse(200, true, 'User deleted successfully', deletedUser, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};






module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserCount,
};
