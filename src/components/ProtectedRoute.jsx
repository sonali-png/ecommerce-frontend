import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!token) {
    // not logged in → redirect to login, but remember where they wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}