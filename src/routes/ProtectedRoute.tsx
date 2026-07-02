import { Navigate, Outlet } from "react-router";

const AUTH_KEY = "taskflow_auth";

export default function ProtectedRoute() {
  const auth = localStorage.getItem(AUTH_KEY);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  try {
    const parsedAuth = JSON.parse(auth);

    if (parsedAuth.isLoggedIn) {
      return <Outlet />;
    }

    return <Navigate to="/login" replace />;
  } catch {
    return <Navigate to="/login" replace />;
  }
}