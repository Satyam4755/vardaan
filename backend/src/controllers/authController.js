const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { clearTokenCookie, setTokenCookie } = require('../utils/generateToken');

const formatUserResponse = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error('Full name, email, and password are required.');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    res.status(409);
    throw new Error('An account already exists with this email.');
  }

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
  });

  setTokenCookie(res, user._id);

  res.status(201).json({
    message: 'Account created successfully.',
    user: formatUserResponse(user),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required.');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  const isPasswordValid = await user.matchPassword(password);

  if (!isPasswordValid) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  setTokenCookie(res, user._id);

  res.json({
    message: 'Logged in successfully.',
    user: formatUserResponse(user),
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  clearTokenCookie(res);

  res.json({
    message: 'Logged out successfully.',
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    user: formatUserResponse(req.user),
  });
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
