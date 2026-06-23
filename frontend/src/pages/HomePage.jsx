import { Link } from 'react-router-dom';

import { heroStats } from '../data/siteData';

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
              <li>Deployment planning, documentation included</li>
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
