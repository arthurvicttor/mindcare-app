import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const isAdmin = localStorage.getItem("adminLogado") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
}

export default AdminRoute;
