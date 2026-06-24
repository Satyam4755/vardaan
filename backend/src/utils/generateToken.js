const jwt = require('jsonwebtoken');

const TOKEN_COOKIE_NAME = 'vardaan_token';

const buildCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 8 * 60 * 60 * 1000,
  path: '/',
});

const setTokenCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '8h',
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
