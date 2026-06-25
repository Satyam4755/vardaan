const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { clearTokenCookie, setTokenCookie } = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

  clearTokenCookie(res);
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

  clearTokenCookie(res);
  setTokenCookie(res, user._id);

  res.json({
    message: 'Logged in successfully.',
    user: formatUserResponse(user),
  });
});

const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error('Google token is required.');
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email, picture, sub } = ticket.getPayload();

  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    user = await User.create({
      fullName: name,
      email: email.toLowerCase(),
      authProvider: 'google',
      googleId: sub,
      avatar: picture,
    });
  } else if (!user.googleId) {
    user.googleId = sub;
    user.authProvider = 'google';
    if (!user.avatar) user.avatar = picture;
    await user.save();
  }

  clearTokenCookie(res);
  setTokenCookie(res, user._id);

  res.json({
    message: 'Google login successful.',
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
  googleAuth,
};
