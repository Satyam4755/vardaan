const express = require('express');

const {
  createBuildRequest,
  getMyBuildRequests,
  deleteBuildRequest,
} = require('../controllers/buildRequestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getMyBuildRequests).post(createBuildRequest);
router.route('/:id').delete(deleteBuildRequest);

module.exports = router;
