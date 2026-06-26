import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="font-heading text-primary text-xl uppercase tracking-widest">Loading...</p>
      </div>
    );
  }

  return currentUser ? <Outlet /> : <Navigate to="/admin/login" />;
}
