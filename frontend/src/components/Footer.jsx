import { Link } from 'react-router-dom';

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
];

const verificationRoutes = [
  { label: 'Home', to: '/', path: '/' },
  { label: 'Login', to: '/login', path: '/login' },
  { label: 'Signup', to: '/signup', path: '/signup' },
  { label: 'Request Build', to: '/request-build', path: '/request-build' },
  { label: 'Dashboard', to: '/dashboard', path: '/dashboard' },
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
                {exploreLinks.map((link) =>
                  link.href ? (
                    <a key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} to={link.to}>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </section>

            <section>
              <h4>Verification Routes</h4>
              <div className="footer-links footer-links--routes">
                {verificationRoutes.map((route) => (
                  <Link key={route.path} to={route.to} className="footer-route">
                    <strong>{route.label}</strong>
                    <span>{route.path}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="footer-cta">
              <h4>Project Access</h4>
              <p>
                These footer links keep all 5 application routes visible and easy to verify for
                payment gateway or deployment review.
              </p>
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
