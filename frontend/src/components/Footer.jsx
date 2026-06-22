const footerLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Request Build', href: '/request-build' },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="eyebrow">Vardaan Labs</p>
          <h3>Elegant software delivery for businesses that want to move quickly.</h3>
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
