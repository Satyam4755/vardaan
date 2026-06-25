import { Link } from 'react-router-dom';

import { heroStats } from '../data/siteData';
const ShowcaseSection = () => (
  <section className="showcase-section container">
    <div className="showcase-header">
      <p className="eyebrow">Selected Work</p>
      <h2>What we build for modern businesses.</h2>
      <p>Real categories. Practical delivery. Premium execution. See how we turn concepts into digital reality.</p>
    </div>
    <div className="showcase-grid">
      {showcaseData.map((project) => (
        <a key={project.name} href={project.url} target="_blank" rel="noreferrer" className="showcase-card">
          <div className={`showcase-badge ${project.badgeClass}`}>
            {project.badgeText}
          </div>
          <div className="showcase-content">
            <h3>{project.name}</h3>
            <span className="showcase-category">{project.category}</span>
            <ul className="showcase-features">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  </section>
);

const AboutSection = () => (
  <section className="about-section container">
    <div className="about-intro">
      <p className="eyebrow">Why Vardaan Labs?</p>
      <h2>Turning ideas into credible digital products.</h2>
      <p>
        We build premium websites and software experiences for modern businesses.
        Our approach combines clean frontend engineering, scalable backend architecture,
        and launch-ready delivery.
      </p>
    </div>
    <div className="about-cards">
      <article className="about-card">
        <h3>Our Services</h3>
        <p>Business websites, custom web applications, admin dashboards, lead capture, and business workflow systems.</p>
      </article>
      <article className="about-card">
        <h3>Project Scope</h3>
        <ul>
          <li>Brochure websites</li>
          <li>Healthcare / service platforms</li>
          <li>Food / business ordering systems</li>
          <li>Internal tools / admin panels</li>
        </ul>
      </article>
      <article className="about-card">
        <h3>Vision & Philosophy</h3>
        <ul>
          <li>Elegant design with practical business value</li>
          <li>Performance + usability</li>
          <li>Scalable systems, not just static pages</li>
          <li>Clean delivery and long-term maintainability</li>
        </ul>
      </article>
    </div>
  </section>
);

const showcaseData = [
  {
    name: 'Fitcore',
    badgeClass: 'showcase-badge--fitcore',
    badgeText: 'FC',
    category: 'Fitness & Wellness Platform',
    url: 'https://fitcore-mwkx.onrender.com/',
    features: [
      'Premium fitness / gym web experience',
      'Service pages and membership journeys',
      'Conversion-focused UI'
    ]
  },
  {
    name: 'Medcii',
    badgeClass: 'showcase-badge--medcii',
    badgeText: 'MD',
    category: 'Healthcare Consultation',
    url: 'https://medcii.onrender.com/',
    features: [
      'Patient-friendly healthcare experience',
      'Doctor / consultation / service flow UI',
      'Trust-driven design for medical businesses'
    ]
  },
  {
    name: 'Tiffin Seva',
    badgeClass: 'showcase-badge--tiffin',
    badgeText: 'TS',
    category: 'Meal Subscription Platform',
    url: 'https://tiffin-seva.com/',
    features: [
      'Recurring meal service website',
      'Ordering / service info / lead generation',
      'Practical operations-focused delivery'
    ]
  },
  {
    name: 'TapResto',
    badgeClass: 'showcase-badge--tapresto',
    badgeText: 'TR',
    category: 'Restaurant & Hospitality',
    url: 'https://www.tapresto.online/',
    features: [
      'Restaurant web presence and ordering flow',
      'Brand-focused digital menus',
      'Lead capture and business workflow'
    ]
  }
];


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

      <AboutSection />
      <ShowcaseSection />

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
