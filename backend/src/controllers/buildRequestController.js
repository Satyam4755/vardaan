const BuildRequest = require('../models/BuildRequest');
const asyncHandler = require('../utils/asyncHandler');
const { calculatePricing } = require('../utils/calculatePricing');
const { sendBuildRequestNotification } = require('../utils/sendEmail');

const normalizeFeatures = (requiredFeatures) => {
  if (Array.isArray(requiredFeatures)) {
    return requiredFeatures.map((feature) => feature.trim()).filter(Boolean);
  }

  return String(requiredFeatures || '')
    .split(/[\n,]/)
    .map((feature) => feature.trim())
    .filter(Boolean);
};

const getComputedTimeline = (packageLevel) => {
  switch (packageLevel) {
    case 'basic': return 'Same day / 1 day';
    case 'intermediate': return '2 days';
    case 'professional': return '1–2 weeks';
    default: return 'Pending';
  }
};

const createBuildRequest = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    companyName,
    projectTitle,
    projectType,
    projectDescription,
    selectedPackage,
    requiredFeatures,
    extraFeaturesCount,
    needDeployment,
    additionalNotes,
  } = req.body;

  const normalizedFeatures = normalizeFeatures(requiredFeatures);
  const normalizedPackage = String(selectedPackage || '').toLowerCase();
  const normalizedProjectType = String(projectType || '').toLowerCase();
  const extraFeatureCountValue = Number(extraFeaturesCount || 0);
  const needsDeployment = needDeployment === true || needDeployment === 'true';
  const validPackages = ['basic', 'intermediate', 'professional'];
  const validProjectTypes = ['website', 'web-app', 'software'];

  if (
    !fullName ||
    !email ||
    !phone ||
    !companyName ||
    !projectTitle ||
    !normalizedProjectType ||
    !projectDescription ||
    !normalizedPackage
  ) {
    res.status(400);
    throw new Error('Please complete all required request fields.');
  }

  if (normalizedFeatures.length === 0) {
    res.status(400);
    throw new Error('Please list at least one required feature.');
  }

  if (!validProjectTypes.includes(normalizedProjectType)) {
    res.status(400);
    throw new Error('Please select a valid project type.');
  }

  if (!validPackages.includes(normalizedPackage)) {
    res.status(400);
    throw new Error('Please select a valid package.');
  }

  if (Number.isNaN(extraFeatureCountValue) || extraFeatureCountValue < 0) {
    res.status(400);
    throw new Error('Extra features count must be zero or greater.');
  }

  const pricing = calculatePricing({
    selectedPackage: normalizedPackage,
    extraFeaturesCount: extraFeatureCountValue,
    needDeployment: needsDeployment,
  });

  const buildRequest = await BuildRequest.create({
    user: req.user._id,
    fullName,
    email: email.toLowerCase(),
    phone,
    companyName,
    projectTitle,
    projectType: normalizedProjectType,
    projectDescription,
    selectedPackage: normalizedPackage,
    requiredFeatures: normalizedFeatures,
    extraFeaturesCount: extraFeatureCountValue,
    needDeployment: needsDeployment,
    timeline: getComputedTimeline(normalizedPackage),
    additionalNotes,
    pricing,
  });

  // Trigger email notification (non-blocking)
  sendBuildRequestNotification(buildRequest).catch(err => {
    console.error('Unhandled email error:', err);
  });

  res.status(201).json({
    message: 'Build request submitted successfully.',
    buildRequest,
  });
});

const getMyBuildRequests = asyncHandler(async (req, res) => {
  const requests = await BuildRequest.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json({
    count: requests.length,
    requests,
  });
});

const deleteBuildRequest = asyncHandler(async (req, res) => {
  const request = await BuildRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Build request not found.');
  }

  if (request.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this request.');
  }

  await request.deleteOne();

  res.json({ message: 'Request deleted successfully.' });
});

module.exports = {
  createBuildRequest,
  getMyBuildRequests,
  deleteBuildRequest,
};
