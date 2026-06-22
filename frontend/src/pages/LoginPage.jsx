import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to log you in right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-shell container auth-shell">
      <div className="auth-panel auth-panel--brand">
        <p className="eyebrow">Welcome back</p>
        <h1>Return to your project dashboard.</h1>
        <p>
          Sign in to submit a new build request, review your current package selections, and
          keep every project brief in one place.
        </p>
      </div>

      <div className="auth-panel auth-panel--form">
        <form className="panel card-form" onSubmit={handleSubmit}>
          <div className="panel__header">
            <h2>Login</h2>
            <p>Secure access to your build request workspace.</p>
          </div>

          {error ? <div className="alert alert--error">{error}</div> : null}

          <FormField id="email" label="Email address">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField id="password" label="Password">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormField>

          <button className="btn btn--primary btn--full" type="submit" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>

          <p className="form-caption">
            Need an account? <Link to="/signup">Create one here.</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
