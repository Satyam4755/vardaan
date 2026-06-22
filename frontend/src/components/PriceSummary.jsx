import {
  DEPLOYMENT_RATE,
  EXTRA_FEATURE_RATE,
  calculatePriceSummary,
  formatCurrency,
  packageLabels,
} from '../utils/pricing';

function PriceSummary({ selectedPackage, extraFeaturesCount, needDeployment, featureCount }) {
  const summary = calculatePriceSummary({
    selectedPackage,
    extraFeaturesCount,
    needDeployment,
  });

  return (
    <aside className="summary-card">
      <div className="summary-card__header">
        <p className="eyebrow">Price Summary</p>
        <h3>{packageLabels[selectedPackage] || 'Package'} estimate</h3>
      </div>

      <dl className="summary-list">
        <div>
          <dt>Package</dt>
          <dd>{formatCurrency(summary.basePrice)}</dd>
        </div>
        <div>
          <dt>Extra features</dt>
          <dd>
            {extraFeaturesCount} x {formatCurrency(EXTRA_FEATURE_RATE)} ={' '}
            {formatCurrency(summary.extraFeaturesPrice)}
          </dd>
        </div>
        <div>
          <dt>Deployment</dt>
          <dd>{needDeployment ? formatCurrency(DEPLOYMENT_RATE) : 'Not included'}</dd>
        </div>
        <div>
          <dt>Requested features listed</dt>
          <dd>{featureCount}</dd>
        </div>
        <div>
          <dt>Maintenance</dt>
          <dd>Included by company</dd>
        </div>
      </dl>

      <div className="summary-total">
        <span>Total</span>
        <strong>{formatCurrency(summary.totalPrice)}</strong>
      </div>

      <p className="summary-note">
        Professional requests include planning for 15+ core features. Additional bespoke
        features are charged separately at {formatCurrency(EXTRA_FEATURE_RATE)} each.
      </p>
    </aside>
  );
}

export default PriceSummary;
