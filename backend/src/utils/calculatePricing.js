const PACKAGE_PRICES = {
  basic: 3000,
  intermediate: 8000,
  professional: 15000,
};

const EXTRA_FEATURE_RATE = 500;
const DEPLOYMENT_RATE = 500;

const calculatePricing = ({ selectedPackage, extraFeaturesCount = 0, needDeployment = false }) => {
  const packageKey = String(selectedPackage || '').toLowerCase();
  const basePrice = PACKAGE_PRICES[packageKey];
  const extraCount = Number(extraFeaturesCount || 0);

  if (!basePrice) {
    throw new Error('Please select a valid package.');
  }

  if (Number.isNaN(extraCount) || extraCount < 0) {
    throw new Error('Extra features count must be zero or greater.');
  }

  const extraFeaturesPrice = extraCount * EXTRA_FEATURE_RATE;
  const deploymentPrice = needDeployment ? DEPLOYMENT_RATE : 0;

  return {
    basePrice,
    extraFeaturesPrice,
    deploymentPrice,
    totalPrice: basePrice + extraFeaturesPrice + deploymentPrice,
    // maintenanceIncluded: true,
  };
};

module.exports = {
  PACKAGE_PRICES,
  EXTRA_FEATURE_RATE,
  DEPLOYMENT_RATE,
  calculatePricing,
};
