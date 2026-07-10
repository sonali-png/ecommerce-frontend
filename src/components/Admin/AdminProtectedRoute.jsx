import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminProtectedRoute() {
  const { admin, loading } = useAdminAuth();
  console.log(admin);

  if (loading) return <p>Loading...</p>;

  return admin ? <Outlet /> : <Navigate to="/admin/login" />;
}