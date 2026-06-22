const express = require('express');

const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;
