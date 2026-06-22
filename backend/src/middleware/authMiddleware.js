const jwt = require('jsonwebtoken');

const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { TOKEN_COOKIE_NAME } = require('../utils/generateToken');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies[TOKEN_COOKIE_NAME]) {
    token = req.cookies[TOKEN_COOKIE_NAME];
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Authentication required.');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    res.status(401);
    throw new Error('User account no longer exists.');
  }

  req.user = user;
  next();
});

module.exports = {
  protect,
};
