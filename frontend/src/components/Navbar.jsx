import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const publicLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
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
              <a key={link.label} className="site-nav__item" href={link.href}>
                {link.label}
              </a>
            ))}
            {user ? (
              <NavLink className="site-nav__item" to="/dashboard">
                Dashboard
              </NavLink>
            ) : null}
          </div>

          <div className="site-nav__actions">
            {user ? (
              <>
                <Link className="btn btn--ghost" to="/request-build">
                  Request Build
                </Link>
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
