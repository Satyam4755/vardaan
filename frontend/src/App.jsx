import { Route, Routes, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PremiumLoader from './components/PremiumLoader';
import { useAuth } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PricingPage from './pages/PricingPage';
import RequestBuildPage from './pages/RequestBuildPage';
import ServicesPage from './pages/ServicesPage';
import SignupPage from './pages/SignupPage';

function App() {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) {
    const isProtected = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/request-build');
    
    if (isProtected) {
      return <PremiumLoader title="Restoring your workspace..." subtitle="Verifying your secure session." />;
    }
    
    return <PremiumLoader />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/request-build"
          element={
            <ProtectedRoute>
              <RequestBuildPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
