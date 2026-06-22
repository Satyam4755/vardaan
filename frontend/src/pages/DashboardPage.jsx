import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import apiClient from '../api/apiClient';
import { formatCurrency, packageLabels, projectTypeLabels } from '../utils/pricing';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function DashboardPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadRequests = async () => {
      try {
        const { data } = await apiClient.get('/build-requests');
        if (isActive) {
          setRequests(data.requests);
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError.response?.data?.message ||
              'We could not load your build requests right now.'
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadRequests();

    return () => {
      isActive = false;
    };
  }, []);

  const totalPipelineValue = requests.reduce(
    (sum, request) => sum + (request.pricing?.totalPrice || 0),
    0
  );

  if (loading) {
    return (
      <section className="page-shell container">
        <div className="panel panel--center">
          <div className="spinner" />
          <p>Loading your request dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell container">
      <div className="page-header">
        <div>
          <p className="eyebrow">Client Dashboard</p>
          <h1>Track every build request in one place.</h1>
          <p>
            Review your submitted briefs, package choices, selected features, and pricing
            totals before the next project conversation.
          </p>
        </div>
        <Link className="btn btn--primary" to="/request-build">
          Submit Another Request
        </Link>
      </div>

      {error ? <div className="alert alert--error">{error}</div> : null}

      <div className="metric-grid">
        <article className="metric-card">
          <span>Total Requests</span>
          <strong>{requests.length}</strong>
        </article>
        <article className="metric-card">
          <span>Pipeline Value</span>
          <strong>{formatCurrency(totalPipelineValue)}</strong>
        </article>
        <article className="metric-card">
          <span>Maintenance</span>
          <strong>Included</strong>
        </article>
      </div>

      {requests.length === 0 ? (
        <div className="panel panel--empty">
          <h2>No build requests submitted yet.</h2>
          <p>
            Once you submit a project brief, it will appear here with pricing, timeline, and
            package details.
          </p>
          <Link className="btn btn--primary" to="/request-build">
            Create Your First Request
          </Link>
        </div>
      ) : (
        <div className="dashboard-grid">
          {requests.map((request) => (
            <article key={request._id} className="request-card">
              <div className="request-card__top">
                <div>
                  <span className="status-pill">{request.status}</span>
                  <h3>{request.projectTitle}</h3>
                  <p>
                    {request.companyName} ·{' '}
                    {projectTypeLabels[request.projectType] || request.projectType}
                  </p>
                </div>
                <strong>{formatCurrency(request.pricing.totalPrice)}</strong>
              </div>

              <div className="request-card__meta">
                <span>Package: {packageLabels[request.selectedPackage]}</span>
                <span>Timeline: {request.timeline}</span>
                <span>Submitted: {dateFormatter.format(new Date(request.createdAt))}</span>
                <span>Deployment: {request.needDeployment ? 'Yes' : 'No'}</span>
              </div>

              <p className="request-card__description">{request.projectDescription}</p>

              <div className="tag-row">
                {request.requiredFeatures.map((feature) => (
                  <span key={feature} className="tag">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="request-card__footer">
                <span>Extra features: {request.extraFeaturesCount}</span>
                <span>Maintenance included</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
