import {
  DEPLOYMENT_RATE,
  EXTRA_FEATURE_RATE,
  PACKAGE_PRICES,
  formatCurrency,
} from '../utils/pricing';

export const heroStats = [
  { label: 'Projects planned around business goals', value: '100%' },
  { label: 'Average kickoff response', value: '24 hrs' },
  { label: 'Maintenance coverage included', value: 'Yes' },
];

export const serviceCards = [
  {
    title: 'Business Websites',
    description:
      'Marketing websites, service portals, and conversion-focused pages designed to look premium on every screen.',
  },
  {
    title: 'Web Applications',
    description:
      'Custom dashboards, internal tools, client portals, and process automation built with reliable MERN patterns.',
  },
  {
    title: 'Software Delivery',
    description:
      'Product strategy, technical architecture, deployment support, and ongoing maintenance for growing teams.',
  },
];

export const pricingCards = [
  {
    slug: 'basic',
    title: 'Basic',
    price: PACKAGE_PRICES.basic,
    description: 'For brochure websites and launch-ready service pages.',
    features: ['Responsive design', 'Core pages and CTA setup', 'Standard contact flows'],
  },
  {
    slug: 'intermediate',
    title: 'Intermediate',
    price: PACKAGE_PRICES.intermediate,
    description: 'For brands that need richer UX, forms, and business workflows.',
    features: ['Custom UI system', 'Dashboard-ready architecture', 'Advanced conversion sections'],
  },
  {
    slug: 'professional',
    title: 'Professional',
    price: PACKAGE_PRICES.professional,
    description: 'For serious product builds with 15+ planned features and deeper delivery scope.',
    features: ['15+ core features included', 'Scalable module structure', 'Deployment guidance and launch planning'],
  },
];

export const pricingNotes = [
  `Deployment add-on: ${formatCurrency(DEPLOYMENT_RATE)}`,
  `Each extra feature: ${formatCurrency(EXTRA_FEATURE_RATE)}`,
  'Maintenance is included by company',
];
