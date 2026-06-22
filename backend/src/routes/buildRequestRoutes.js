const express = require('express');

const {
  createBuildRequest,
  getMyBuildRequests,
} = require('../controllers/buildRequestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getMyBuildRequests).post(createBuildRequest);

module.exports = router;
