import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signup, user } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create your account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-shell container auth-shell">
      <div className="auth-panel auth-panel--brand">
        <p className="eyebrow">Start a project</p>
        <h1>Create your client account and plan the build properly.</h1>
        <p>
          Once you sign up, you can submit project requirements, preview package pricing, and
          keep every request organized in your dashboard.
        </p>
      </div>

      <div className="auth-panel auth-panel--form">
        <form className="panel card-form" onSubmit={handleSubmit}>
          <div className="panel__header">
            <h2>Sign Up</h2>
            <p>Create your secure workspace for build requests.</p>
          </div>

          {error ? <div className="alert alert--error">{error}</div> : null}

          <FormField id="fullName" label="Full name">
            <input
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField id="signupEmail" label="Email address">
            <input
              id="signupEmail"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField id="signupPassword" label="Password">
            <input
              id="signupPassword"
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField id="confirmPassword" label="Confirm password">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormField>

          <button className="btn btn--primary btn--full" type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="form-caption">
            Already registered? <Link to="/login">Login here.</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SignupPage;
