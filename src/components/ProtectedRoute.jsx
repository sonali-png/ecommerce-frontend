import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {

  const token = localStorage.getItem("adminAccessToken");
  const location = useLocation();

  if (!token) {
    // not logged in → redirect to login, but remember where they wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

   return <Outlet />
}