const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const buildRequestRoutes = require('./routes/buildRequestRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173' || 'https://vardaansolutions.onrender.com',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vardaan Labs API is running.',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/build-requests', buildRequestRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
