const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const buildRequestRoutes = require('./routes/buildRequestRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:5173',
  'https://vardaansolutions.vercel.app',
  'https://vardaansolutions.onrender.com'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(...process.env.FRONTEND_URL.split(',').map(url => url.trim()));
}
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
