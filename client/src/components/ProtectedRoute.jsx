import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isLoggedIn, user, loading } = useAuth();
  const location = useLocation();

  // Wait for auth rehydration before deciding
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    // Preserve where they were going so we can redirect after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children;
}
