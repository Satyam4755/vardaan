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
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = async () => {
    if (!requestToDelete) return;
    setIsDeleting(true);
    
    try {
      await apiClient.delete(`/build-requests/${requestToDelete}`);
      setRequests((prev) => prev.filter((r) => r._id !== requestToDelete));
      setRequestToDelete(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete request.');
    } finally {
      setIsDeleting(false);
    }
  };

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
          {/* <span>Maintenance</span> */}
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
                {/* <span>Maintenance included</span> */}
              </div>

              <div className="delete-btn-card">
                <button 
                  onClick={() => setRequestToDelete(request._id)}
                  className="btn btn--ghost"
                  type="button"
                >
                  Delete Request
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {requestToDelete && (
        <div className="delete-modal-overlay" onClick={() => setRequestToDelete(null)}>
          <div className="delete-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
            <h2 className="delete-modal-title">Delete this request?</h2>
            <p className="delete-modal-message">
              Are you sure you want to delete your request? <br />
              If there is any problem, you can contact our team directly on this number: <strong>8052200225</strong>
            </p>
            <div className="delete-modal-actions">
              <button 
                className="btn btn--danger" 
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Request'}
              </button>
              <button 
                className="btn btn--secondary" 
                onClick={() => setRequestToDelete(null)}
                disabled={isDeleting}
              >
                Keep Request
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
