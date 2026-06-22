const jwt = require('jsonwebtoken');

const TOKEN_COOKIE_NAME = 'vardaan_token';

const buildCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const setTokenCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie(TOKEN_COOKIE_NAME, token, buildCookieOptions());
  return token;
};

const clearTokenCookie = (res) => {
  res.cookie(TOKEN_COOKIE_NAME, '', {
    ...buildCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  });
};

module.exports = {
  TOKEN_COOKIE_NAME,
  setTokenCookie,
  clearTokenCookie,
};
