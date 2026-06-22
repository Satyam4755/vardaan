import { Link } from 'react-router-dom';

import { heroStats, pricingCards, pricingNotes, serviceCards } from '../data/siteData';
import { formatCurrency } from '../utils/pricing';

function HomePage() {
  const requestPath = '/request-build';

  return (
    <>
      <section className="hero container">
        <div className="hero__content">
          <p className="eyebrow">MERN studio for modern businesses</p>
          <h1>Premium websites and software products built with clarity, speed, and polish.</h1>
          <p className="hero__copy">
            Vardaan Labs helps software businesses and service companies turn ideas into
            credible digital products with thoughtful UX, structured engineering, and launch
            support that feels buttoned up from the start.
          </p>
          <div className="button-row">
            <Link className="btn btn--primary" to={requestPath}>
              Request Build
            </Link>
            <a className="btn btn--secondary" href="#pricing">
              See Pricing
            </a>
          </div>
          <div className="hero-stats">
            {heroStats.map((item) => (
              <article key={item.label} className="hero-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero__panel">
          <article className="spotlight-card">
            <span className="spotlight-card__pill">Launch Blueprint</span>
            <h2>What you get with every engagement</h2>
            <ul className="feature-list">
              <li>Brand-conscious frontend built with React and Vite</li>
              <li>Clean Express and MongoDB backend with admin-ready structure</li>
              <li>Deployment planning, documentation, and maintenance coverage included</li>
            </ul>
          </article>

          <article className="spotlight-card spotlight-card--accent">
            <span className="spotlight-card__pill">Project Confidence</span>
            <p>
              Start with a structured build request, get an instant price estimate, and keep
              your submitted briefs organized inside a secure dashboard.
            </p>
          </article>
        </div>
      </section>

      <section id="services" className="section container">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Built for companies that want elegance without sacrificing practicality.</h2>
        </div>
        <div className="card-grid">
          {serviceCards.map((service) => (
            <article key={service.title} className="info-card">
              <span className="info-card__index">{service.title.slice(0, 1)}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="section section--soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Pricing</p>
            <h2>Clear package pricing with simple feature-based add-ons.</h2>
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

      <section className="section container">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Ready to start?</p>
            <h2>Tell us what you need and see your estimated total before you submit.</h2>
          </div>
          <Link className="btn btn--primary" to={requestPath}>
            Request Build
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
