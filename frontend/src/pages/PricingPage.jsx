import { pricingCards, pricingNotes } from '../data/siteData';
import { formatCurrency } from '../utils/pricing';

function PricingPage() {
  return (
    <div className="page-shell">
      <section className="section section--soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pricing</p>
              <h2>Clear package pricing with simple feature-based add-ons.</h2>
            </div>
          </div>
          <div className="pricing-grid">
            {pricingCards.map((plan) => (
              <article key={plan.slug} className="pricing-card">
                <div className="pricing-card__header">
                  <h3>{plan.title}</h3>
                  <strong>{formatCurrency(plan.price)}</strong>
                </div>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="pricing-notes">
            {pricingNotes.map((note) => (
              <span key={note}>{note}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
