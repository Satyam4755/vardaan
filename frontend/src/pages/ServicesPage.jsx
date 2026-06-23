import { serviceCards } from '../data/siteData';

function ServicesPage() {
  return (
    <div className="page-shell">
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Services</p>
            <h2>Built for companies that want elegance without sacrificing practicality.</h2>
          </div>
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
    </div>
  );
}

export default ServicesPage;
