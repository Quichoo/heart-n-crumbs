import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
