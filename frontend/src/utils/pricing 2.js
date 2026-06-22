export const PACKAGE_PRICES = {
  basic: 3000,
  intermediate: 8000,
  professional: 15000,
};

export const EXTRA_FEATURE_RATE = 500;
export const DEPLOYMENT_RATE = 500;

export const packageLabels = {
  basic: 'Basic',
  intermediate: 'Intermediate',
  professional: 'Professional',
};

export const projectTypeLabels = {
  website: 'Website',
  'web-app': 'Web App',
  software: 'Software',
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);

export const calculatePriceSummary = ({
  selectedPackage = 'basic',
  extraFeaturesCount = 0,
  needDeployment = false,
}) => {
  const packageKey = selectedPackage in PACKAGE_PRICES ? selectedPackage : 'basic';
  const basePrice = PACKAGE_PRICES[packageKey];
  const extraCount = Number(extraFeaturesCount || 0);
  const extraFeaturesPrice = Math.max(0, extraCount) * EXTRA_FEATURE_RATE;
  const deploymentPrice = needDeployment ? DEPLOYMENT_RATE : 0;

  return {
    basePrice,
    extraFeaturesPrice,
    deploymentPrice,
    totalPrice: basePrice + extraFeaturesPrice + deploymentPrice,
    maintenanceIncluded: true,
  };
};
