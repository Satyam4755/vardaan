import { Link } from 'react-router-dom';

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__card">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <p className="eyebrow">Vardaan Labs</p>
            <h3>Elegant software delivery for businesses that want to move quickly.</h3>
            <p>
              Premium websites, web apps, and software builds with structured delivery,
              polished frontend execution, and clear business-focused presentation.
            </p>
          </div>

          <div className="site-footer__columns">
            <section>
              <h4>Explore</h4>
              <div className="footer-links">
                {exploreLinks.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h4>Legal</h4>
              <div className="footer-links">
                {legalLinks.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            <section className="footer-cta">
              <h4>Project Access</h4>
              <p>Start your custom website or software build.</p>
              <Link className="btn btn--primary" to="/request-build">
                Request Build
              </Link>
            </section>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>{`© ${currentYear} Vardaan Labs`}</span>
          <span>All core routes linked for app verification and review</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
