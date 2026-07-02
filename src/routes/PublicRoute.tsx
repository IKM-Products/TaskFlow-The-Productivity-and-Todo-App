import { Navigate, Outlet } from "react-router";

const AUTH_KEY = "taskflow_auth";

export default function PublicRoute() {
  const auth = localStorage.getItem(AUTH_KEY);

  if (!auth) {
    return <Outlet />;
  }

  try {
    const parsedAuth = JSON.parse(auth);

    if (parsedAuth.isLoggedIn) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return <Outlet />;
  }
}