const jwt = require('jsonwebtoken');
const { generateAccessToken, verifyRefreshToken } = require('../utils/jwtUtil');
const User = require('../models/userModel');


const authenticateToken = async (req, res, next) => {
  console.log('Request Headers:', req.headers); // Log the headers for debugging
  // Make sure you actually pull `authorization` out of headers:
  const authHeader = req.headers['authorization']; // lowercase!
  const refreshHeader = req.headers['refresh-token']; // lowercase!

  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = refreshHeader && refreshHeader.split(' ')[1];

  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);
  // const authHeader = req.headers['authorization'];
  // const refreshHeader = req.headers['refresh-token'];
  // const accessToken = authHeader && authHeader.split(' ')[1];
  // const refreshToken = refreshHeader && refreshHeader.split(' ')[1];
  // console.log("Access Token:", accessToken);

  // const accessToken = localStorage.getItem('authorization')?.split(' ')[1];
  // const refreshToken = localStorage.getItem('refresh-token')?.split(' ')[1];
  // console.log("Access Token:", accessToken);

  if (!accessToken) {
    console.log('Access token missing');
    return res.sendResponse(401, false, 'Access token missing');
  }

  if (!refreshToken) {
    console.log('Refresh token missing');
    return res.sendResponse(401, false, 'Refresh token missing');
  }

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.log('Server configuration error');
    return res.sendResponse(500, false, 'Server configuration error');
  }
  console.log("here");

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          try {
            const decodedRefresh = verifyRefreshToken(refreshToken);

            const existingUser = await User.findById(decodedRefresh.id);
            if (!existingUser) {
              return res.sendResponse(401, false, 'User not found');
            }

            const newAccessToken = generateAccessToken({
              _id: decodedRefresh.id,
              role: decodedRefresh.role,
            });

            req.user = {
              id: decodedRefresh.id,
              role: decodedRefresh.role,
              accessToken: newAccessToken,
              refreshToken,
            };

            res.setHeader('authorization', `Bearer ${newAccessToken}`);

            return next();
          } catch (refreshErr) {
            return res.sendResponse(403, false, 'Invalid refresh token');
          }
        }

        return res.sendResponse(403, false, 'Access token verification failed');
      }

      const existingUser = await User.findById(user.id);
      if (!existingUser) {
        return res.sendResponse(401, false, 'User not found');
      }

      req.user = {
        id: user.id,
        role: user.role,
        accessToken,
        refreshToken,
      };
      console.log('req.user', user);

      next();
    }
  );
};

module.exports = authenticateToken;
