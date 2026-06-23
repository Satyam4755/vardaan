import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../api/apiClient';
import FormField from '../components/FormField';
import PriceSummary from '../components/PriceSummary';
import { useAuth } from '../context/AuthContext';

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  projectTitle: '',
  projectType: 'website',
  projectDescription: '',
  selectedPackage: 'basic',
  requiredFeaturesText: 'Homepage\nLead capture form\nAdmin-ready content sections',
  extraFeaturesCount: 0,
  needDeployment: false,
  timeline: '2-4 weeks',
  additionalNotes: '',
};

function RequestBuildPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }

    setFormData((current) => ({
      ...current,
      fullName: current.fullName || user.fullName,
      email: current.email || user.email,
    }));
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === 'extraFeaturesCount' ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await apiClient.post('/build-requests', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        projectTitle: formData.projectTitle,
        projectType: formData.projectType,
        projectDescription: formData.projectDescription,
        selectedPackage: formData.selectedPackage,
        requiredFeatures: formData.requiredFeaturesText
          .split(/[\n,]/)
          .map((feature) => feature.trim())
          .filter(Boolean),
        extraFeaturesCount: formData.extraFeaturesCount,
        needDeployment: formData.needDeployment,
        timeline: formData.timeline,
        additionalNotes: formData.additionalNotes,
      });

      navigate('/dashboard');
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || 'We could not submit your build request.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const featureCount = formData.requiredFeaturesText
    .split(/[\n,]/)
    .map((feature) => feature.trim())
    .filter(Boolean).length;

  return (
    <section className="page-shell container">
      <div className="page-header">
        <div>
          <p className="eyebrow">Request Build</p>
          <h1>Share the details and get a live project estimate.</h1>
          <p>
            This form captures the business context, delivery scope, package selection, and
            feature count your team needs before we move into execution.
          </p>
        </div>
      </div>

      <div className="request-layout">
        <form className="panel card-form" onSubmit={handleSubmit}>
          <div className="panel__header">
            <h2>Project Brief</h2>
            <p>Fill in your project details and review the estimate before submitting.</p>
          </div>

          {error ? <div className="alert alert--error">{error}</div> : null}

          <div className="form-grid">
            <FormField id="fullName" label="Full name">
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </FormField>

            <FormField id="email" label="Email">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@business.com"
                required
              />
            </FormField>

            <FormField id="phone" label="Phone">
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 555 123 4567"
                required
              />
            </FormField>

            <FormField id="companyName" label="Company or business name">
              <input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your company name"
                required
              />
            </FormField>

            <FormField id="projectTitle" label="Project title">
              <input
                id="projectTitle"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                placeholder="Client portal revamp"
                required
              />
            </FormField>

            <FormField id="projectType" label="Project type">
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="website">Website</option>
                <option value="web-app">Web App</option>
                <option value="software">Software</option>
              </select>
            </FormField>

            <FormField id="selectedPackage" label="Selected package">
              <select
                id="selectedPackage"
                name="selectedPackage"
                value={formData.selectedPackage}
                onChange={handleChange}
                required
              >
                <option value="basic">Basic - 3000</option>
                <option value="intermediate">Intermediate - 8000</option>
                <option value="professional">Professional - 15000</option>
              </select>
            </FormField>

            <FormField
              id="extraFeaturesCount"
              label="Number of extra features"
              hint="Each extra feature adds 500 to the project estimate."
            >
              <input
                id="extraFeaturesCount"
                name="extraFeaturesCount"
                type="number"
                min="0"
                value={formData.extraFeaturesCount}
                onChange={handleChange}
                required
              />
            </FormField>
          </div>

          <FormField id="projectDescription" label="Project description">
            <textarea
              id="projectDescription"
              name="projectDescription"
              rows="5"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Describe what the product should do, who it serves, and any goals that matter."
              required
            />
          </FormField>

          <FormField
            id="requiredFeaturesText"
            label="Required features"
            hint="Separate each feature with a new line or comma."
          >
            <textarea
              id="requiredFeaturesText"
              name="requiredFeaturesText"
              rows="5"
              value={formData.requiredFeaturesText}
              onChange={handleChange}
              placeholder="Dashboard&#10;User roles&#10;Notifications"
              required
            />
          </FormField>

          <div className="choice-panel">
            <div>
              <span className="field__label">Need deployment?</span>
              <p className="field__hint">Deployment adds 500.</p>
            </div>
            <div className="segmented-control">
              <button
                className={!formData.needDeployment ? 'is-active' : ''}
                type="button"
                onClick={() => setFormData((current) => ({ ...current, needDeployment: false }))}
              >
                No
              </button>
              <button
                className={formData.needDeployment ? 'is-active' : ''}
                type="button"
                onClick={() => setFormData((current) => ({ ...current, needDeployment: true }))}
              >
                Yes
              </button>
            </div>
          </div>

          <div className="form-grid">
            <FormField id="timeline" label="Timeline or deadline">
              <input
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="6 weeks"
                required
              />
            </FormField>

            <FormField id="additionalNotes" label="Additional notes">
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows="3"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any integrations, references, or launch notes"
              />
            </FormField>
          </div>

          <button className="btn btn--primary btn--full" type="submit" disabled={submitting}>
            {submitting ? 'Submitting request...' : 'Submit Build Request'}
          </button>
        </form>

        <PriceSummary
          selectedPackage={formData.selectedPackage}
          extraFeaturesCount={formData.extraFeaturesCount}
          needDeployment={formData.needDeployment}
          featureCount={featureCount}
        />
      </div>
    </section>
  );
}

export default RequestBuildPage;
