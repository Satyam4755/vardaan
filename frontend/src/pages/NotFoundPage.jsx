import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="page-shell container">
      <div className="panel panel--center">
        <p className="eyebrow">404</p>
        <h1>That page drifted out of scope.</h1>
        <p>Head back home to explore services, pricing, or submit a fresh build request.</p>
        <Link className="btn btn--primary" to="/">
          Back Home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
