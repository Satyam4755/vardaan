import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const publicLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
];

const previewContent = {
  Services: {
    title: 'Services',
    lines: [
      'Custom websites and business software',
      'Responsive frontend and backend delivery',
      'Admin-ready builds and deployment support'
    ]
  },
  Pricing: {
    title: 'Pricing',
    lines: [
      'Basic, Intermediate and Professional packages',
      'Feature-based add-ons',
      'Clear package pricing before build request'
    ]
  },
  Dashboard: {
    title: 'Dashboard',
    lines: [
      'Track submitted build requests',
      'View package, features and pricing summary',
      'Manage requests in one place'
    ]
  },
  'Request Build': {
    title: 'Request Build',
    lines: [
      'Submit your project requirements',
      'Choose package, timeline and features',
      'Send build request directly to Vardaan Labs'
    ]
  }
};

function NavHoverCard({ itemKey, children }) {
  const content = previewContent[itemKey];
  if (!content) return children;
  
  return (
    <div className="nav-hover-wrapper">
      {children}
      <div className="nav-preview-card">
        <h4 className="nav-preview-title">{content.title}</h4>
        <ul className="nav-preview-list">
          {content.lines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand-mark" to="/">
          <span className="brand-mark__badge">V</span>
          <div>
            <strong>Vardaan Labs</strong>
            <small>Software and web delivery</small>
          </div>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${isOpen ? 'site-nav--open' : ''}`}>
          <div className="site-nav__links">
            {publicLinks.map((link) => (
              <NavHoverCard key={link.label} itemKey={link.label}>
                <NavLink className="site-nav__item" to={link.to}>
                  {link.label}
                </NavLink>
              </NavHoverCard>
            ))}
            {user ? (
              <NavHoverCard itemKey="Dashboard">
                <NavLink className="site-nav__item" to="/dashboard">
                  Dashboard
                </NavLink>
              </NavHoverCard>
            ) : null}
          </div>

          <div className="site-nav__actions">
            {loading ? null : user ? (
              <>
                <NavHoverCard itemKey="Request Build">
                  <Link className="btn btn--ghost" to="/request-build">
                    Request Build
                  </Link>
                </NavHoverCard>
                <button className="btn btn--secondary" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className="text-link site-nav__item" to="/login">
                  Login
                </NavLink>
                <Link className="btn btn--primary" to="/signup">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
